import "./Auth.scss"
import { useState } from "react"
import { userSignUp, userLogIn, getSession } from "../../api"
import Error from "../../components/Error/Error"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true) // true for login, false for register
    const [showError, setShowError] = useState(false)
    const [errorText, setErrorText] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        setShowError(false)
        console.log("Submitted:", { email, password, isLogin })
        // check to make sure password meets requirements, diplay error if not




        if (isLogin) {
            userLogIn(email, password)
                .then(data => {
                    if (data.error) {
                        displayError(data.error.message)
                    } else {
                        console.log(data.data.session)
                        console.log(data.data.user)
                    }
                })
                .catch(error => console.log(error))
        } else {
            userSignUp(email, password)
                .then(data => {
                    if (data.error) {
                        displayError(data.error.message)
                    } else {
                        console.log(data.session)
                        console.log(data.user)
                    }
                })
                .catch(error => console.log(error.message))
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