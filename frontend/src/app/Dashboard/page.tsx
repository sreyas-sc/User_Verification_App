"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import { useRouter } from 'next/navigation';
import { setUserDetails } from '../Redux/userSlice';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists in session storage
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      dispatch(setUserDetails(JSON.parse(sessionUser)));
    }
  }, [dispatch]);

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const renderCard = (title: string, verified: boolean, path: string, info: string) => (
    <div
      className={`${styles.card} ${verified ? styles.verified : ''}`}
      onClick={() => !verified && handleCardClick(path)}
    >
      <h3>{title}</h3>
      <p>{info}</p>
      <p>{verified ? 'Verified' : 'Not Verified'}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Dashboard</h1>
      <div className={styles.cardsContainer}>
        {renderCard(
          'Email',
          user.email_verify ?? false,
          '/verify-email',
          `Email: ${user.email}`
        )}
        {renderCard(
          'Phone',
          user.phone_verify ?? false,
          '/verify-phone',
          `Phone: ${user.phone}`
        )}
        {renderCard(
          'Aadhar',
          user.aadhar_verify ?? false,
          '/verify-aadhar',
          `Aadhar: ${user.aadhar}`
        )}
      </div>
    </div>
  );
};

export default Dashboard;
