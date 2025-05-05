export const CountryMock = {
  list: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          data: [
            {
              id: 1,
              country: "India",
            },
          ],
        });
      }, 2000);
    });
  },
};
