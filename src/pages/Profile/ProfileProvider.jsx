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
        const { data, error } = await supabase.storage.from("avatars").getPublicUrl(`${user.id}/profile`)
        if (error) {
            console.log(error.message)
            return
        }
        setAvatarUrl(data.publicUrl)
        setIsLoadingProfile(false)
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