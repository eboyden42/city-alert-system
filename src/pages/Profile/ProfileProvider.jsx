import { useContext, createContext, useState, useEffect } from "react"
import { supabase } from "../../api"
import { useAuth } from "../Auth/AuthProvider"

const ProfileContext = createContext()

export default function ProfileProvider({ children }) {

    const { user, isLoading } = useAuth()
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)

    async function updateProfile() {
        setIsLoadingProfile(true)
        if (isLoading || !user) return
        const { data } = await supabase.storage.from("avatars").getPublicUrl(`${user.id}/profile`)
        const exists = await urlExists(data.publicUrl)
        if (exists) {
            const bust = Date.now().toString()
            setAvatarUrl(`${data.publicUrl}?cd=${bust}`)
        } else {
            setAvatarUrl(null)
        }
        setIsLoadingProfile(false)
    }

    async function urlExists(objectUrl) {
        try {
            const res = await fetch(objectUrl, {method: "Head"})

            if (res.status == 200) {
                return true
            } else if (res.status == 400) {
                return false
            } else {
                console.error("Error checking existence of profile picture")
                console.log(res)
                return false
            }
        } catch {
            console.error("Network rror checking existence of profile picture")
            return false
        }
    } 

    useEffect(() => {
        updateProfile()
    }, [isLoading])

    return <ProfileContext.Provider value={{ updateProfile, avatarUrl, isLoadingProfile }} >
        {children}
    </ProfileContext.Provider>
}

export function useProfile() {
    return useContext(ProfileContext)
}