import "./Profile.scss"
import { useState } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"
import { useProfile } from "./ProfileProvider"
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"
import Error from "../../components/Error/Error"

export default function Profile() {

    const { user } = useAuth()
    const { avatarUrl, updateProfile } = useProfile()
    const [file, setFile] = useState(null)
    const [showProfileError, setShowProfileError] = useState(false)
    const [profileErrorText, setProfileErrorText] = useState("An error has occured.")

    async function uploadProfile(file) {
        console.log("uploading: ", file)
        setShowProfileError(false)
        if (file == null) return
        const { data, error } = await supabase.storage.from("avatars").upload(`${user.id}/profile`, file, {
            upsert: true,
            cacheControl: 5,
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

    return (
        <div className="profile-page">
            <h2>Profile information:</h2>
            <div className="profile-left">
                <ProfilePicture src={file ? URL.createObjectURL(file) : null} />
                <h3>Upload image:</h3>
                <input type="file" onChange={handleChange} />
                <button onClick={() => uploadProfile(file)}>Upload profile</button>
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