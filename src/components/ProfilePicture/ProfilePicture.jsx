import "./ProfilePicture.scss"
import React from "react"
import { FaUserCircle } from "react-icons/fa";
import { useProfile } from "../../pages/Profile/ProfileProvider"

export default function ProfilePicture({ src, width=200, height=200, ...rest }) {

    const { isLoadingProfile: loading, avatarUrl} = useProfile()

    const style = {
        width: width,
        height: height
    }

    return (
        <>
        <div className="profile-container" {...rest}>
            {
                src ? (
                    <img className="profile-img" src={src} alt="Profile picture" style={style} />
                ) : (
                    (!loading && avatarUrl) ? (
                        <img className="profile-img" src={avatarUrl} alt="Profile picture" style={style} />
                    ) : (
                        <FaUserCircle style={style} />
                    )
                )
            }
        </div>
        </>
    )
}