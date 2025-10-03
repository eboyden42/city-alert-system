import "./Profile.scss"
import { useState } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"
import { useProfile } from "./ProfileProvider"
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"
import Info from "../../components/Info/Info"
import Error from "../../components/Error/Error"
import { FaArrowCircleRight } from "react-icons/fa"
import { WiDayCloudy } from "react-icons/wi"

export default function Profile() {

    // profile picture state
    const { user } = useAuth()
    const { updateProfile } = useProfile()
    const [file, setFile] = useState(null)

    // profile picture popups
    const [showProfileError, setShowProfileError] = useState(false)
    const [profileErrorText, setProfileErrorText] = useState("An error has occured.")
    const [showProfileInfo, setShowProfileInfo] = useState(false)
    const [profileInfoText, setProfileInfoText] = useState(false)

    // form state
    const displayName = user?.user_metadata.display_name ? user.user_metadata.display_name : ""
    const displaySplit = displayName != "" ? displayName.split(" ") : ["", ""]
    const lastEmail = user?.email
    const lastPhone = user?.phone

    const [firstName, setFirstName] = useState(displaySplit[0])
    const [lastName, setLastName] = useState(displaySplit[1])
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)

    // profile fields popups
    const [showFormInfo, setShowFormInfo] = useState(false)
    const [formInfoList, setFormInfoList] = useState([])

    const [showNameError, setShowNameError] = useState(false)
    const [nameErrorText, setNameErrorText] = useState("There was an error with updating your name.")
    const [showEmailError, setShowEmailError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState("There was an error with updating your email.")
    const [showPhoneError, setShowPhoneError] = useState(false)
    const [phoneErrorText, setPhoneErrorText] = useState("There was an error with updating your phone.")

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

    function displayFormInfo(message) {
        setFormInfoList(prev => [...prev, message])
        setShowFormInfo(true)
    }

    function displayNameError(message) {
        setNameErrorText(message)
        setShowNameError(true)
    }

    function displayEmailError(message) {
        setEmailErrorText(message)
        setShowEmailError(true)
    }

    function displayPhoneError(message) {
        setPhoneErrorText(message)
        setShowPhoneError(true)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setShowFormInfo(false)
        setFormInfoList([])
        setShowEmailError(false)
        setShowNameError(false)
        setShowPhoneError(false)

        // handle name changing
        const submittedName = `${firstName.trim()} ${lastName.trim()}`
        if (displayName !== submittedName && submittedName !== " ") { // check to see if name has changed
            console.log("Changing name...")
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    display_name: `${firstName} ${lastName}`,
                }
            })
            if (error) {
                console.error(error)
                displayNameError(error.message)
            } else {
                console.log("Updated name successfully: ", data)
            }
        }

        // handle email changing
        setEmail(prev => prev.trim())
        if (lastEmail !== email && email !== "") {
            console.log("Changing email...")
            const { data, error } = await supabase.auth.updateUser({
                email: email
            })
            if (error) {
                console.error(error)
                displayEmailError(error.message)
            } else {
                console.log("Sent confirmation email: ", data)
                displayFormInfo(`A confirmation email has been sent to both ${lastEmail} and ${email}. Click either link to confirm and save your email update.`)
            }
        }

        // handle phone change
        setPhone(prev => prev.trim())
        if (lastPhone !== phone) {
            console.log("Changing phone...")
            const { data, error } = await supabase.auth.updateUser({
                phone: phone
            })
            if (error) {
                console.error(error)
                displayPhoneError(error.message)
            } else {
                console.log("Success: ", data)
            }
        }
    }
    
    const formInfoComponents = formInfoList.map((message, index) => <Info key={index}>{message}</Info>)

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
                        {showNameError ? (
                        <div className="row-input">
                            <div className="field">
                                <Error>
                                    {nameErrorText}
                                </Error>
                            </div>
                        </div>
                        ) : null}
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
                        {showEmailError ? (
                        <div className="row-input">
                            <div className="field">
                                <Error>
                                    {emailErrorText}
                                </Error>
                            </div>
                        </div>
                        ) : null}
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
                        {showPhoneError ? (
                        <div className="row-input">
                            <div className="field">
                                <Error>
                                    {phoneErrorText}
                                </Error>
                            </div>
                        </div>
                        ) : null}
                        <button type="submit" className="save-btn">
                            Save changes
                            <FaArrowCircleRight />
                        </button>
                        {
                            showFormInfo ? (
                                formInfoComponents
                            ) : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}