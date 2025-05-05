export const StatsMock = {
  get: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          data: {
            members: 63,
            cases: 128,
          },
        })
      }, 2000)
    })
  },
}
