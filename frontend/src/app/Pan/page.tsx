// "use client";

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/app/Redux/store';
// import { useRouter } from 'next/navigation';
// import { verifyPanAPI } from '../Services/allAPI'; // Ensure this function handles email as well
// import { setUserDetails } from '../Redux/userSlice'; 
// import styles from './pan.module.css';
// import { constrainedMemory } from 'process';

// const VerifyPan = () => {
//   const user = useSelector((state: RootState) => state.user);
//   const [panInput, setPanInput] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const router = useRouter();
//   const dispatch = useDispatch();

//   console.log(user.email)

//   const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPanInput(e.target.value);
//   };

//   const handleVerify = async () => {
//     const reqBody = { pan: panInput, email: user.email }; // Include email in the request body
//     console.log(panInput, user.email);

//     try {
//       const response = await verifyPanAPI(reqBody);
//       if (response.status === 200) {
//         setSuccess('PAN verified successfully!');
//         setError('');
        
//         // Optionally update user details in the Redux store
//         dispatch(setUserDetails({ ...user, pan_verify: true }));
        
//         // Save verification status to session storage
//         sessionStorage.setItem('pan_verified', 'true');

//         // Wait for 2 seconds before redirecting
//         setTimeout(() => {
//           router.push('/Dashboard'); // Redirect to dashboard
//         }, 2000);
//       } else {
//         setError('Failed to verify PAN. Please try again.');
//         setSuccess('');
//       }
//     } catch (error) {
//       setError('An error occurred during verification.');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.header}>Verify PAN CARD</h1>
//       <p className={styles.subheader}>Please enter your PAN Card number for verification.</p>
//       <input
//         type="text"
//         placeholder="Enter PAN Card number"
//         value={panInput}
//         onChange={handlePanChange}
//         className={styles.input}
//       />
//       <button onClick={handleVerify} className={styles.verifyButton}>Verify PAN</button>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       {success && <p className={styles.successMessage}>{success}</p>}
//     </div>
//   );
// };

// export default VerifyPan;


"use client";

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import { useRouter } from 'next/navigation';
import { verifyPanAPI } from '../Services/allAPI'; 
import { setUserDetails } from '../Redux/userSlice'; 
import styles from './pan.module.css';

const VerifyPan = () => {
  const user = useSelector((state: RootState) => state.user);
  const [panInput, setPanInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPanInput(e.target.value);
  };

  const handleVerify = async () => {
    const reqBody = { pan: panInput, email: user.email }; // Include email in the request body
    console.log(panInput, user.email);

    try {
      const response = await verifyPanAPI(reqBody);
      if (response.status === 200) {
        setSuccess('PAN verified successfully!');
        setError('');
        
        // Optionally update user details in the Redux store
        dispatch(setUserDetails({ pan_verify: true }));
        
        // Save verification status to session storage
        sessionStorage.setItem('pan_verified', 'true');

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push('/Dashboard'); // Redirect to dashboard
        }, 2000);
      } else {
        setError('Failed to verify PAN. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred during verification.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Verify PAN CARD</h1>
      <p className={styles.subheader}>Please enter your PAN Card number for verification.</p>
      <input
        type="text"
        placeholder="Enter PAN Card number"
        value={panInput}
        onChange={handlePanChange}
        className={styles.input}
      />
      <button onClick={handleVerify} className={styles.verifyButton}>Verify PAN</button>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}
    </div>
  );
};

export default VerifyPan;
