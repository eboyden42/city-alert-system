import "./Profile.scss"
import { useState } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"
import { useProfile } from "./ProfileProvider"
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"
import Info from "../../components/Info/Info"
import Error from "../../components/Error/Error"

export default function Profile() {

    const { user } = useAuth()
    const { updateProfile } = useProfile()
    const [file, setFile] = useState(null)
    const [showProfileError, setShowProfileError] = useState(false)
    const [profileErrorText, setProfileErrorText] = useState("An error has occured.")
    const [showProfileInfo, setShowProfileInfo] = useState(false)
    const [profileInfoText, setProfileInfoText] = useState(false)

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
        displayProfileInfo("Changes may take a few moments to appear.")
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

    return (
        <div className="profile-page">
            <h2>Edit profile</h2>
            <hr />
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

            </div>
        </div>
    )
}