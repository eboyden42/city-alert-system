import React, { useState } from "react"
import { supabase } from "../../api.js"
import "./SMSOTP.scss"
import { IoClose } from "react-icons/io5"

export default function SMSOTP( { phone, closeModal } ) {

    const [code, setCode] = useState("XXXXXX")

    async function handleSubmit() {
        console.log("Verifying code...")
        const { data, error } = await supabase.auth.verifyOtp({
            phone_change: phone,
            token: code,
            type: 'sms'
        })
        if (error) {
            console.log("Error verifying otp: ", error.message)
        } else {
            console.log("Success!")
        }

    }

    return (
        <div className="darken-bg">
            <div className="otp-modal centered">
                <div className="top-line">
                    <h3>
                        An SMS one time code has been sent to <span>{phone}</span>. 
                    </h3>
                    <button id="exit-btn" onClick={closeModal}><IoClose /></button>
                </div>
                <form>
                    <label htmlFor="otp">Enter 6 digit code here:</label>
                    <input
                        id="otp"
                        placeholder="XXXXXX"
                        className="otp"
                        type="text"
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="verify" onClick={handleSubmit}>
                        Verify
                    </button>
                </form>
            </div>
        </div>
    )
}