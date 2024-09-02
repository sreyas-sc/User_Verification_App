"use client";

import { useState } from "react";
import styles from './address.module.css'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setVerificationStatus } from "@/app/Redux/userSlice";
import { verifyAddressAPI } from '../Services/allAPI';
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Swal from 'sweetalert2'
import { setUserDetails } from '../Redux/userSlice';


function Address() {
    
    const user = useSelector((state: RootState) => state.user);
    const [pincode, setPincode] = useState('');
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const isVerified = useSelector((state: RootState) => state.user.isVerified.address);
    
    // API call to verify Pincode
    const verifyAddress = async () => {

        const reqBody = {
            email: 'sreyas.sc@gmail.com'
        };
        console.log(reqBody);

       

        try {
            const result = await verifyAddressAPI(pincode, reqBody);

            if(result.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Pincode verified successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setStatus(true);
                dispatch(setVerificationStatus({ address: true }));
                dispatch(setUserDetails({ address_verify: true }));
                sessionStorage.setItem('address_verified', 'true');

                setTimeout(() => {
                    router.push('/Dashboard'); // Redirect to dashboard
                  }, 2000);
                  
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Invalid Pincode.',
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
    }

    return (
        <div className={styles.inputFields}>
            <label className={styles.labelName}>Pincode:</label>
            <div className={styles.fields}>
                <input 
                    type="text" 
                    value={pincode} 
                    placeholder="Enter your pincode" 
                    onChange={(e) => setPincode(e.target.value)} 
                />
                <button onClick={verifyAddress}>Verify Pincode</button>
            </div>

            <div className={styles.status}>
                {isVerified && <div className={styles.verifiedMessage}>Verified &#10003;</div>}
            </div>
        </div>
    );
}

export default Address;
