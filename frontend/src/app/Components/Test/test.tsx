"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {verifyEmailAPI, verifyOtpAPI} from '../../Services/allAPI'
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

function Test(){
    const [email,setEmail] = useState('')
    const [otp,setOtp] = useState('')

    const user = useSelector((state: RootState) => state.user);

    const verifyEmail = async() => {
        console.log('clicked email');
        const reqBody = {email:email}
        try{
            const response = await verifyEmailAPI(reqBody);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }

    const verifyOtp = async() => {
         const reqBody = {email:email,otp:otp}
         console.log('clicked otp');
        try{
            const response = await verifyOtpAPI(reqBody);
            console.log(response);
        }
        catch(error){
            console.log(error);
        } 
    }

        

    return(
        <>
            <div className="container"  style={{margin:' 0px auto'}}>
                <input type="text" value={user.email} placeholder="email" readOnly />
                <button onClick={() => verifyEmail()}>send otp</button>
            </div>

            <div className="container"  style={{margin:' 0px auto'}}>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input type="text" onChange={e => setOtp(e.target.value)} />
                <button onClick={() => verifyOtp()}>send otp</button>
            </div>
        </>
    )
}

export default Test;