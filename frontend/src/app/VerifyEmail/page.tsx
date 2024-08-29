// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { verifyEmailAPI, verifyOtpAPI } from '../Services/allAPI'
// // // import { useSelector } from "react-redux";
// // // import { RootState } from "../Redux/store";
// // // import styles from './email.module.css'

// // // function page() {
// // //     const [otp, setOtp] = useState('')

// // //     const email = useSelector((state: RootState) => state.user.email);

// // //     const verifyEmail = async () => {

// // //         const reqBody = { email }
// // //         try {
// // //             const response = await verifyEmailAPI(reqBody);
// // //             console.log(response);
// // //         }
// // //         catch (error) {
// // //             console.log(error);
// // //         }
// // //     }

// // //     useEffect(() => {
// // //         verifyEmail()
// // //     }, [email])

// // //     const verifyOtp = async() => {
// // //         const reqBody = {email,otp}
// // //         console.log('clicked otp');
// // //        try{
// // //            const response = await verifyOtpAPI(reqBody);
// // //            console.log(response);
// // //        }
// // //        catch(error){
// // //            console.log(error);
// // //        } 
// // //    }


// // //     return (
// // //         <div>
// // //             <div className={styles.container}>
// // //                 <h1>Email Verification</h1>
// // //                 <p>
// // //                     A verification code has been sent to your email: <strong>{email}</strong>
// // //                 </p>

// // //                 <div className={styles.verification}>
// // //                     <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
// // //                     <button onClick={() => verifyOtp()}> Verify Email </button>
// // //                 </div>

// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default page



// // "use client";

// // import { useEffect, useState } from "react";
// // import { verifyEmailAPI, verifyOtpAPI } from '../Services/allAPI'
// // import { useSelector } from "react-redux";
// // import { RootState } from "../Redux/store";
// // import styles from './email.module.css'

// // function Page() {
// //     const [otp, setOtp] = useState('');
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');
// //     const [isResending, setIsResending] = useState(false);

// //     const email = useSelector((state: RootState) => state.user.email);

// //     const verifyEmail = async () => {
// //         const reqBody = { email };
// //         try {
// //             const response = await verifyEmailAPI(reqBody);
// //             console.log(response);
// //         } catch (error) {
// //             console.log(error);
// //             setError('Failed to send verification email.');
// //         }
// //     };

// //     const verifyOtp = async () => {
// //         const reqBody = { email, otp };
// //         console.log('clicked otp');
// //         try {
// //             const response = await verifyOtpAPI(reqBody);
// //             console.log(response);
// //             if (response.status === 200) {
// //                 setSuccess('Email verified successfully!');
// //                 setError('');
// //             } else {
// //                 setError('Failed to verify OTP. Please check the OTP and try again.');
// //                 setSuccess('');
// //             }
// //         } catch (error) {
// //             console.log(error);
// //             setError('An error occurred during verification.');
// //             setSuccess('');
// //         }
// //     };

// //     const resendOtp = async () => {
// //         setIsResending(true);
// //         await verifyEmail(); // Attempt to resend OTP
// //         setIsResending(false);
// //     };

// //     useEffect(() => {
// //         if (email) {
// //             verifyEmail();
// //         }
// //     }, [email]);

// //     return (
// //         <div>
// //             <div className={styles.container}>
// //                 <h1>Email Verification</h1>
// //                 <p>
// //                     A verification code has been sent to your email: <strong>{email}</strong>
// //                 </p>

// //                 <div className={styles.verification}>
// //                     <input
// //                         type="text"
// //                         placeholder="Enter OTP"
// //                         value={otp}
// //                         onChange={(e) => setOtp(e.target.value)}
// //                     />

                    
// // <div className={styles.inputfields}>
// //     <input placeholder="" type="tel" maxLength="1"/>
// //     <input placeholder="" type="tel" maxLength="1"/>
// //     <input placeholder="" type="tel" maxlength="1"/>
// //     <input placeholder="" type="tel" maxlength="1"/>
// //     <input placeholder="" type="tel" maxlength="1"/>
// //     <input placeholder="" type="tel" maxlength="1"/>
// //   </div>

// //                     <button onClick={() => verifyOtp()}>Verify Email</button>
// //                     <button
// //                         onClick={resendOtp}
// //                         disabled={isResending}
// //                     >
// //                         {isResending ? 'Resending...' : 'Resend OTP'}
// //                     </button>
// //                 </div>

// //                 {error && <p className={styles.errorMessage}>{error}</p>}
// //                 {success && <p className={styles.successMessage}>{success}</p>}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Page;




// "use client";

// import { useEffect, useState, useRef } from "react";
// import { verifyEmailAPI, verifyOtpAPI } from '../Services/allAPI';
// import { useSelector } from "react-redux";
// import { RootState } from "../Redux/store";
// import styles from './email.module.css';

// function Page() {
//     const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']); // Array to hold each digit
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isResending, setIsResending] = useState(false);

//     const email = useSelector((state: RootState) => state.user.email);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//     useEffect(() => {
//         if (email) {
//             verifyEmail();
//         }
//     }, [email]);

//     const verifyEmail = async () => {
//         const reqBody = { email };
//         try {
//             const response = await verifyEmailAPI(reqBody);
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//             setError('Failed to send verification email.');
//         }
//     };

//     const verifyOtp = async () => {
//         const otpString = otp.join('');
//         console.log('Typed OTP:', otpString); // Log OTP to console
//         const reqBody = { email, otp: otpString };
//         try {
//             const response = await verifyOtpAPI(reqBody);
//             console.log(response);
//             if (response.status === 200) {
//                 setSuccess('Email verified successfully!');
//                 setError('');
//             } else {
//                 setError('Failed to verify OTP. Please check the OTP and try again.');
//                 setSuccess('');
//             }
//         } catch (error) {
//             console.log(error);
//             setError('An error occurred during verification.');
//             setSuccess('');
//         }
//     };

//     const resendOtp = async () => {
//         setIsResending(true);
//         await verifyEmail(); // Attempt to resend OTP
//         setIsResending(false);
//     };

//     const handleChange = (index: number, value: string) => {
//         const newOtp = [...otp];
//         newOtp[index] = value;

//         // Move focus to next input if value is entered
//         if (value && index < otp.length - 1) {
//             inputRefs.current[index + 1]?.focus();
//         }

//         // Move focus to previous input if value is deleted
//         if (!value && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }

//         setOtp(newOtp);
//     };

//     return (
//         <div>
//             <div className={styles.container}>
//                 <h1 className={styles.header}>Email Verification</h1>
//                 <p  className={styles.subheader}>
//                     A verification code has been sent to your email: <strong>{email}</strong>
//                 </p>

//                 <div className={styles.verification}>
//                     <div className={styles.inputfields}>
//                         {otp.map((value, index) => (
//                             <input
//                                 key={index}
//                                 type="tel"
//                                 maxLength={1}
//                                 value={value}
//                                 onChange={(e) => handleChange(index, e.target.value)}
//                                 // ref={(el) => inputRefs.current[index] = el}
//                             />
//                         ))}
//                     </div>

//                     <div className={styles.buttons}>
//                         <button onClick={() => verifyOtp()}>Verify Email</button>
//                         <br></br>
//                         <button
//                             onClick={resendOtp}
//                             disabled={isResending}
//                         >
//                             {isResending ? 'Resending...' : 'Resend OTP'}
//                         </button>
//                     </div>
//                 </div>

//                 {error && <p className={styles.errorMessage}>{error}</p>}
//                 {success && <p className={styles.successMessage}>{success}</p>}
//             </div>
//         </div>
//     );
// }

// export default Page;



"use client";

import { useEffect, useState, useRef } from "react";
import { verifyEmailAPI, verifyOtpAPI } from '../Services/allAPI';
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import styles from './email.module.css';

function Page() {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']); // Array to hold each digit
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isResending, setIsResending] = useState(false);

    const email = useSelector((state: RootState) => state.user.email);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (email) {
            verifyEmail();
        }
    }, [email]);

    const verifyEmail = async () => {
        const reqBody = { email };
        try {
            const response = await verifyEmailAPI(reqBody);
            console.log(response);
        } catch (error) {
            console.log(error);
            setError('Failed to send verification email.');
        }
    };

    const verifyOtp = async () => {
        const otpString = otp.join('');
        console.log('Typed OTP:', otpString); // Log OTP to console
        const reqBody = { email, otp: otpString };
        try {
            const response = await verifyOtpAPI(reqBody);
            console.log(response);
            if (response.status === 200) {
                setSuccess('Email verified successfully!');
                setError('');
            } else {
                setError('Failed to verify OTP. Please check the OTP and try again.');
                setSuccess('');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during verification.');
            setSuccess('');
        }
    };

    const resendOtp = async () => {
        setIsResending(true);
        await verifyEmail(); // Attempt to resend OTP
        setIsResending(false);
    };

    const handleChange = (index: number, value: string) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        // Move focus to next input if value is entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Move focus to previous input if value is deleted
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        setOtp(newOtp);
    };

    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.header}>Email Verification</h1>
                <p className={styles.subheader}>
                    A verification code has been sent to your email: <strong>{email}</strong>
                </p>

                <div className={styles.verification}>
                    <div className={styles.inputfields}>
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="tel"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                ref={(el) => { inputRefs.current[index] = el; }}
                            />
                        ))}
                    </div>

                    <div className={styles.buttons}>
                        <button onClick={() => verifyOtp()}>Verify Email</button>
                        <br />
                        <button
                            onClick={resendOtp}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </div>
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>{success}</p>}
            </div>
        </div>
    );
}

export default Page;
