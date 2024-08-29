"use client";

import { useEffect, useState } from "react";
import { verifyEmailAPI, verifyOtpAPI } from '../Services/allAPI'
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import styles from './email.module.css'

function page() {
    const [otp, setOtp] = useState('')

    const email = useSelector((state: RootState) => state.user.email);

    const verifyEmail = async () => {

        const reqBody = { email }
        try {
            const response = await verifyEmailAPI(reqBody);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [email])

    const verifyOtp = async() => {
        const reqBody = {email,otp}
        console.log('clicked otp');
       try{
           const response = await verifyOtpAPI(reqBody);
           console.log(response);
       }
       catch(error){
           console.log(error);
       } 
   }


    return (
        <div>
            <div className={styles.container}>
                <h1>Email Verification</h1>
                <p>
                    A verification code has been sent to your email: <strong>{email}</strong>
                </p>

                <div className={styles.verification}>
                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={() => verifyOtp()}> Verify Email </button>
                </div>

            </div>
        </div>
    )
}

export default page