import AsyncStorage from '@react-native-async-storage/async-storage'
import { DAL_CONFIG } from './config'

export const AuthService = {
  login: (username, password) => {
    return DAL_CONFIG.auth.login(username, password).then((response) => {
      console.log('Login Successful => ', response)

      const user = { ...response.data }
      console.log("User after login", user)

      // We got the auth token which is named as authToken in the api
      user.refreshToken = user.refresh
      return AuthService.getAuthToken(user.refreshToken, user)
    })
  },
  signup: (first_name, last_name, email, username, password) => {
    // 1. get the data
    // 2. prepare user state object
    return DAL_CONFIG.auth.signup(first_name, last_name, email, username, password).then((response) => {
      console.log('Signup Successful => ', response)

      return response;
    })
  },
  googleSignup: (token) => {
    return DAL_CONFIG.auth.googleSignup(token).then((response) => {
      console.log('Google Signup Successful => ', response)

      return response;
    })
  },
  otp_code: (otp_code) => {
    return DAL_CONFIG.auth.otp_code(otp_code).then((response) => {
      console.log('OTP Successful => ', response)

      const user = { ...response.data }

      return response;
    })
  },
  getAuthToken: (token, userCopy) => {
    console.log('getAuthToken => ', token)
    return DAL_CONFIG.auth.getAuthToken(token).then((response) => {
      const { data } = response
      const { access } = data
      if (userCopy) {
        const user = {
          ...userCopy,
          authToken: access,
          token: access,
          lastLoginTime: new Date(),
        }
        AsyncStorage.setItem('user', JSON.stringify(user))
        return Promise.resolve(user)
      } else {
        return Promise.resolve(access)
      }
    })
  },
  logout: (refresh) => {
    return DAL_CONFIG.auth.logout(refresh).finally(() => {
      AsyncStorage.removeItem('user')
      return Promise.resolve(true)
    })
  },
}
