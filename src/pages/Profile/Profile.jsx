import "./Profile.scss"
import { useState } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"

export default function Profile() {

    const { user } = useAuth()
    const [file, setFile] = useState(null)

    console.log(file)

    async function uploadProfile(file) {
        console.log("uploading: ", file)
        if (file == null) return
        const { data, error } = await supabase.storage.from("avatars").upload(user.id, file, {
            upsert: true,
        })
        if (error) {
            console.error("Error uploading profile picture: ", error.message)
        } else {
            console.log("Successful upload")
            console.log(data)
        }
    }

    function handleChange(e) {
        const selected = e.target.files[0]
        setFile(selected)
    }

    return (
        <div className="profile-page">
            <h2>Profile information:</h2>
            <div className="profile-left">
                <h3>Upload image:</h3>
                <input type="file" onChange={handleChange} />
                {file && <img src={URL.createObjectURL(file)} className="preview-img" alt="Uploaded preview" />}
                <button onClick={() => uploadProfile(file)}>Upload profile</button>
            </div>
            <div className="profile-left">

            </div>
        </div>
    )
}