export const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const token = user && user.token
  return token
}

export const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  }
}
