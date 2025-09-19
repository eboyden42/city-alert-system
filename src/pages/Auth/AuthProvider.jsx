import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { supabase } from "../../api"

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    async function getCurrentSession() {
        const currentSession = await supabase.auth.getSession()
        console.log(currentSession)
        if (currentSession.error) {
            throw new Error("Failed to get sesson: ", currentSession.error.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCurrentSession()
        
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log(session)
                if (session) {
                    setUser(session.user)
                    setToken(session.access_token)
                }
            }
        )

        return () => {
          authListener.subscription.unsubscribe()
        }
    }, [])

    async function loginAction({email, password}) {
        const res = await supabase.auth.signInWithPassword({
            email, 
            password
        })
        if (res.error) {
            throw new Error(res.error.message)
        } else {
            setUser(res.data.user)
            setToken(res.data.session.access_token)
            navigate("/preferences")
        }
        throw new Error("Error in loginAction function")
    }

    async function signUpAction({email, password}) {
        const res = await supabase.auth.signUp({email, password})
        if (res.error) {
            throw new Error(res.error.message)
        } else {
            setUser(res.data.user)
            setToken(res.data.session?.access_token)
            navigate("/preferences")
        }
        throw new Error("Error in signUpAction function")
    }

    async function logoutAction() {
        await supabase.auth.signOut()
        setUser(null)
        setToken(null)
        navigate("/auth")
    }


    return <AuthContext.Provider value={{ token, user, isLoading, loginAction, signUpAction, logoutAction, getCurrentSession}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}