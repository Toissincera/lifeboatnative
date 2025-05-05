export const AuthMock = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      return reject('Not implemented')
    })
  },
  getAuthToken: (token) => {
    return new Promise((resolve, reject) => {
      return reject('Not implemented')
    })
  },
  logout: (refresh) => {
    return new Promise((resolve, reject) => {
      return reject('Not implemented')
    })
  },
}
