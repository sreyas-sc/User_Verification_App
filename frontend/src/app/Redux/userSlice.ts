import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  phone: string;
  dob: string;
  aadhar: string;
  password: string;
  address: string;
  bank: string;
  gst: string;
  pan: string;
  isVerified: {
    phone: boolean;
    email: boolean;
    aadhar: boolean;
    pan: boolean;
    address: boolean;
    bank: boolean;
    gst: boolean;
  };
  email_verify?: boolean;
  phone_verify?: boolean;
  aadhar_verify?: boolean;
  gst_verify?: boolean;
  bank_verify?: boolean;
  pan_verify?: boolean;
  address_verify?: boolean;
}

const initialState: UserState = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  aadhar: '',
  password: '',
  address: '',
  gst:'',
  bank:'',
  pan:'',
  isVerified: {
    phone: false,
    email: false,
    aadhar: false,
    pan: false,
    bank: false,
    address: false,
    gst: false,
  },
  email_verify: false,
  phone_verify: false,
  aadhar_verify: false,
  gst_verify: false,
  bank_verify: false,
  pan_verify: false,
  address_verify: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setVerificationStatus: (state, action: PayloadAction<Partial<UserState['isVerified']>>) => {
      state.isVerified = { ...state.isVerified, ...action.payload };
    },
  },
});

export const { setUserDetails, setVerificationStatus } = userSlice.actions;
export default userSlice.reducer;
