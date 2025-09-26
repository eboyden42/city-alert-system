import "./Profile.scss"
import { useState } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"
import { useProfile } from "./ProfileProvider"
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"
import Info from "../../components/Info/Info"
import Error from "../../components/Error/Error"
import { FaArrowCircleRight } from "react-icons/fa"

export default function Profile() {

    // profile picture state
    const { user } = useAuth()
    const { updateProfile } = useProfile()
    const [file, setFile] = useState(null)
    const [showProfileError, setShowProfileError] = useState(false)
    const [profileErrorText, setProfileErrorText] = useState("An error has occured.")
    const [showProfileInfo, setShowProfileInfo] = useState(false)
    const [profileInfoText, setProfileInfoText] = useState(false)

    // form state
    const displayName = user?.display_name ? user.displayName : ""
    const displaySplit = displayName != "" ? displayName.split(" ") : ["", ""]

    const [firstName, setFirstName] = useState(displaySplit[0])
    const [lastName, setLastName] = useState(displayName[1])
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)

    const [showFormError, setShowFormError] = useState(false)
    const [formErrorText, setFormErrorText] = useState("There was an error submitting the form.")

    async function uploadProfile(file) {
        console.log("uploading: ", file)
        setShowProfileError(false)
        setShowProfileInfo(false)
        if (file == null) return
        const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/profile`, file, {
            upsert: true,
            cacheControl: 0,
        })
        if (error) {
            console.error("Error uploading profile picture: ", error.message)
            displayProfileError(error.message)
        } else {
            console.log("Successful upload")
        }

        updateProfile()
    }

    function handleChange(e) {
        const selected = e.target.files[0]
        setFile(selected)
        displayProfileInfo("Press upload to save your profile picture.")
    }

    function displayProfileError(message) {
        let text = message
        switch(message) {
            case "The object exceeded the maximum allowed size":
                text = "This profile picture exceeds the 2mb limit. Please upload a smaller image."
                break
        }
        setProfileErrorText(text)
        setShowProfileError(true)
    }

    function displayProfileInfo(message) {
        setProfileInfoText(message)
        setShowProfileInfo(true)
    }

    function displayFormError(message) {
        setFormErrorText(message)
        setShowFormError(message)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setShowFormError(false)
        const { data, error } = await supabase.auth.updateUser({
            display_name: `${firstName} ${lastName}`,
            email: `${email}`,
            phone: `${phone}`
        })

        if (error) {
            console.log(error)
            displayFormError(error.message)
        } else {
            console.log(data)
        }
    }

    return (
        <div className="profile-page">
            <h2>Edit profile</h2>
            <hr />
            <div className="profile-container">
                <div className="profile-left">
                    <ProfilePicture src={file ? URL.createObjectURL(file) : null} />
                    <div className="upload-container">
                        <label 
                            htmlFor="fileUpload" 
                            className="profile-img-upld"
                        >
                            Select File
                        </label>
                        <input 
                            type="file" 
                            onChange={handleChange} 
                            id="fileUpload" 
                            style={{display: "none"}} 
                        />
                        <button onClick={() => uploadProfile(file)}>Upload</button>
                    </div>
                    {
                        showProfileInfo ? (
                            <Info>
                                {profileInfoText}
                            </Info>
                        ) : null
                    }
                    {
                        showProfileError ? (
                            <Error>
                                {profileErrorText}
                            </Error>
                        ) : null
                    }
                </div>
                <div className="profile-right">
                    <form onSubmit={handleSubmit}>
                        <div className="row-input">
                            <div className="field">
                                <label htmlFor="firstName">
                                    First name
                                </label>
                                <input 
                                    className="profile name" 
                                    type="text" 
                                    id="firstName" 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder={firstName}
                                />
                            </div>
                             <div className="field">
                                <label htmlFor="lastName">
                                    Last name
                                </label>
                                <input 
                                    className="profile name" 
                                    type="text" 
                                    id="lastName"
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder={lastName}
                                />
                            </div>
                        </div>
                        <div className="row-input">
                            <div className="field">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="profile" 
                                    type="text" 
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={email}
                                />
                            </div>
                        </div>
                        <div className="row-input">
                            <div className="field">
                                <label htmlFor="phone">
                                    Phone
                                </label>
                                <input 
                                    className="profile" 
                                    type="text" 
                                    id="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={phone}
                                />
                            </div>
                        </div>
                        <button type="submit" className="save-btn">
                            Save changes
                            <FaArrowCircleRight />
                        </button>
                        {
                            showFormError ? (
                                <Error>
                                    {formErrorText}
                                </Error>
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}