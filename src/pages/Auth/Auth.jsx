import "./Auth.scss"
import { useState } from "react"
import { userSignUp, userLogIn, getSession } from "../../api"
import { useAuth } from "./AuthProvider"
import Error from "../../components/Error/Error"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true) // true for login, false for register
    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState(null)

    const auth = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        setShowError(false)
        console.log("Submitted:", { email, password, isLogin })
        // check to make sure password meets requirements, diplay error if not




        if (isLogin) {
            auth.loginAction({email, password})
                .catch(error => displayError(error.message))
        } else {
            auth.signUpAction({email, password})
                .catch(error => displayError(error.message))
        }
    }

    function displayError(error) {
        setErrorText(error)
        setShowError(true)
    }

    return (
        <div className="auth">
            <div className="login-container">
                <h2>
                    {isLogin ? "Welcome back. Enter your login details below." : "Let's get started. Create an account below."}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            aria-label="Password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                {
                    isLogin ? 
                    <p>Don't have an account? <a className="register-link" onClick={() => setIsLogin(false)}>Register now</a>.</p>
                    :
                    <p>Already have an account? <a className="register-link" onClick={() => setIsLogin(true)}>Log in</a>.</p>
                }
                {showError ? 
                    <Error>
                        {errorText}
                    </Error>
                : null}
            </div>
        </div>
    )
}