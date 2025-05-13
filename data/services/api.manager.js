import AsyncStorage from "@react-native-async-storage/async-storage"

export const BASE_URL = 'https://maj.pythonanywhere.com/api/v1'
// export const BASE_URL = 'http://localhost:8000/api/v1'

async function getToken () {
  const user = JSON.parse(AsyncStorage.getItem('user'));
  const token = user && user.token
  return token
}

const getHeaders = (isSecure) => {
  const headers = { 'Content-Type': 'application/json' }
  if (isSecure) {
    headers.Authorization = 'Bearer ' + getToken()
  }

  return headers
}

const getError = (data) => {
  const error = data?.error || data?.detail || data || 'Unknown Error'
  if (Array.isArray(data)) {
    return data
  }

  return error
  // if (typeof error === 'object') {
  //   const errors = []
  //   Object.keys(error).forEach((k) => {
  //     errors.push(...error[k])
  //   })
  //   return errors
  // } else {
  //   return error
  // }
}

const handlePostFetch = (fetchPromise) => {
  return fetchPromise
    .then(async (res) => {
      switch (res.status) {
        case 200:
        case 201: {
          return Promise.resolve({ data: await res.json() })
        }
        case 401: {
          // We need to make an attempt to regenerate token here and again need to call the same api
          return Promise.reject({ message: 'Session expired', code: 401 })
        }
        case 403: {
          return Promise.reject({ message: 'Session expired', code: 403 })
        }
        // case 406: {
        //   navigate("/");
        //   return Promise.reject({ message: 'User disabled. Contact an admin.', code: 406 })
        // }
        default: {
          return Promise.reject(getError(await res.json()))
        }
      }
    })
    .catch((error) => {
      console.log('API Error => ', error)
      return Promise.reject({ error })
    })
}

class ApiManager {
  /**
   * Build the end point with the help of the base URL
   * @param {*} path
   * @returns
   */
  buildPath = (path = '') => {
    return `${BASE_URL}/${path}`
  }

  get = (path = '', isSecure = false) => {
    const url = this.buildPath(path)
    const headers = getHeaders(isSecure)
    const fetchPromise = fetch(url, { method: 'GET', headers })
    return handlePostFetch(fetchPromise)
  }

  post = (path = '', data = {}, isSecure = true) => {
    const url = this.buildPath(path)
    const headers = getHeaders(isSecure)
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    return handlePostFetch(fetchPromise)
  }

  put = (path = '', data = {}, isSecure = true) => {
    const url = this.buildPath(path)
    const headers = getHeaders(isSecure)
    const fetchPromise = fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })

    return handlePostFetch(fetchPromise)
  }
}

export const apiManager = new ApiManager()
