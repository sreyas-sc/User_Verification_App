import React, { useState } from 'react';
import styles from './phone.module.css';

function PhoneVerification() {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePhoneSubmit = async () => {
        // Logic for submitting phone verification
        // For example, calling an API to verify the phone number
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Phone Verification</h1>
            <p className={styles.subheader}>
                Please enter your phone number for verification:
            </p>
            <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.phoneInput}
            />
            <button onClick={handlePhoneSubmit} className={styles.submitButton}>
                Verify Phone
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>{success}</p>}
        </div>
    );
}

export default PhoneVerification;
