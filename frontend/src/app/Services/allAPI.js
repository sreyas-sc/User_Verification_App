import {serverURL} from './serverURL'
import { commonAPI } from './commonAPI'

//register user
export const registerAPI = async(user) => {
    return await commonAPI("post",`${serverURL}/register`,user,"")
}

//verify-email
export const verifyEmailAPI = async(email) => {
    return await commonAPI("post",`${serverURL}/verify-email`,email,"")
}

//verify-otp
export const verifyOtpAPI = async(body) => {
    return await commonAPI("post",`${serverURL}/verify-otp`,body,"")
}