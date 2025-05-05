export const StateMock = {
  get: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          data: [
            {
              id: 1,
              state: "Punjab",
            },
            {
              id: 2,
              state: "Telangana",
            },
            {
              id: 3,
              state: "Tripura",
            },
            {
              id: 4,
              state: "Uttar Pradesh",
            },
            {
              id: 5,
              state: "Maharashtra",
            },
            {
              id: 6,
              state: "Gujarat",
            },
            {
              id: 7,
              state: "Mizoram",
            },
            {
              id: 8,
              state: "Rajasthan",
            },
            {
              id: 9,
              state: "Kerala",
            },
            {
              id: 10,
              state: "West Bengal",
            },
            {
              id: 11,
              state: "Haryana",
            },
            {
              id: 12,
              state: "Bihar",
            },
            {
              id: 13,
              state: "Jammu and Kashmir",
            },
            {
              id: 14,
              state: "Karnataka",
            },
            {
              id: 15,
              state: "Chhattisgarh",
            },
            {
              id: 16,
              state: "Madhya Pradesh",
            },
            {
              id: 17,
              state: "Odisha",
            },
            {
              id: 18,
              state: "Chandigarh",
            },
            {
              id: 19,
              state: "Tamil Nadu ",
            },
            {
              id: 20,
              state: "Andhra Pradesh",
            },
            {
              id: 21,
              state: "Daman and Diu",
            },
            {
              id: 22,
              state: "Uttarakhand",
            },
            {
              id: 23,
              state: "Delhi",
            },
            {
              id: 24,
              state: "Jharkhand",
            },
            {
              id: 25,
              state: "Assam",
            },
            {
              id: 26,
              state: "Sikkim",
            },
            {
              id: 27,
              state: "Manipur",
            },
            {
              id: 28,
              state: "Arunachal Pradesh",
            },
            {
              id: 29,
              state: "Lakshadweep",
            },
            {
              id: 30,
              state: "Nagaland",
            },
            {
              id: 31,
              state: "Goa",
            },
            {
              id: 32,
              state: "Andaman and Nicobar Islands",
            },
            {
              id: 33,
              state: "Puducherry",
            },
            {
              id: 34,
              state: "Meghalaya",
            },
            {
              id: 35,
              state: "Himachal Pradesh",
            },
            {
              id: 36,
              state: "Dadra and Nagar Haveli",
            },
          ],
        });
      }, 2000);
    });
  },
};
