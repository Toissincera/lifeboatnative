import { URLs } from '../../utils/path'
import { apiManager } from '../services/api.manager'

export const AuthApi = {
  login: (username, password) => {
    const path = URLs.auth.login
    return apiManager.post(path, { username, password }, false)
  },
  signup: (first_name, last_name, email, username, password) => {
    const path = URLs.auth.signup
    return apiManager.post(path, { first_name, last_name, email, username, password }, false)
  },
  googleSignup: (google_token) => {
    const path = URLs.auth.signup
    return apiManager.post(path, { google_token }, false)
  },
  otp_code: (otp_code) => {
    const path = URLs.auth.otp_code
    return apiManager.post(path, { otp_code }, true)
  },
  getAuthToken: (refresh) => {
    const path = URLs.auth.authToken
    return apiManager.post(path, { refresh })
  },
  logout: (refresh) => {
    const path = URLs.auth.logout
    return apiManager.post(path, { refresh })
  },
}
