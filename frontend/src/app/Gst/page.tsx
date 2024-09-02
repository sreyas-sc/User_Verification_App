"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { setVerificationStatus } from "@/app/Redux/userSlice";
import { verifyGstAPI } from '../Services/allAPI';
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2';
import { setUserDetails } from '../Redux/userSlice';

import styles from './gst.module.css';
// import { setVerificationStatus } from '../Redux/userSlice';


function Gst() {
    const user = useSelector((state: RootState) => state.user);
    const [gstNo, setGstNo] = useState("");
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.gst);

    // API call to verify GST number
    const verifyGst = async () => {
     
        const reqBody = {
            gstin: gstNo,  email: user.email
        };
        try {
            const response = await verifyGstAPI(reqBody);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'GST Number verified successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setStatus(true);
                dispatch(setUserDetails({ gst_verify: true }));
                dispatch(setUserDetails({ gst: gstNo }));
                dispatch(setVerificationStatus({ gst: true }));
                // sessionStorage.setItem('gst', gstNo);
                

                setTimeout(() => {
                    router.push('/Dashboard'); // Redirect to dashboard
                  }, 2000);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid GST Number.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setStatus(false);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'An error has occurred',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className={styles.inputFields}>
            <label htmlFor="">GST Number:</label>
            <div className={styles.fields}>
                <input 
                    type="text" 
                    value={gstNo} 
                    onChange={(e) => setGstNo(e.target.value)} 
                    placeholder="Enter GST Number" 
                />
                <button onClick={verifyGst}>Verify GST</button>
            </div>

            <div className={styles.status}>
                {isVerified && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>
        </div>
    );
}

export default Gst;
