import "./Auth.scss"
import { useState } from "react"
import { userSignUp, userLogIn } from "../../api"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true) // true for login, false for register

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Submitted:", { email, password, isLogin })
        if (isLogin) {
            userLogIn(email, password)
                .then(data => {
                    if (data.message) {
                        console.log(data.message)
                    } else {
                        console.log(data.error)
                    }
                })
                .catch(error => console.log(error))
        } else {
            userSignUp(email, password)
                .then(data => {
                    if (data.message) {
                        console.log(data.message)
                    } else {
                        console.log(data.error)
                    }
                })
                .catch(error => console.error(error.message))
        }
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
            </div>
        </div>
    )
}