"use client";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../Redux/store'; // Adjust the path if necessary

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;