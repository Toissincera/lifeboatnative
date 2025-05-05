export const memberMock = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 500)
      console.log('from Mock')
    })
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              "member_uid": "9b63ed28-2e19-4b14-bc50-f65f2161348a",
              "photo": "https://example.com/photo.jpg",
              "user": {
                "first_name": "admin",
                "last_name": "admin",
                "username": "admin",
                "email": "admin@gmail.com"
              },
              "phone_number": "1234567890",
              "profession": "Software Engineer",
              "organization": "ABC Company",
              "role": "ameer",
              "enabled": true,
              "address": {
                "street": "123 Main Str",
                "locality": "Cityville",
                "pincode": 12345,
                "zone": 1,
                "city": 212
              }
            }
          ],
        })
      }, 500)
    })
  },
  getCaseStatus: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              "status": "OPENED",
              "name": "OPENED",
            },
            {
              "status": "UNDER_REVIEW",
              "name": "UNDER REVIEW"
            },
            {
              "status": "APPROVED",
              "name": "APPROVED"
            },
            {
              "status": "REJECTED",
              "name": "REJECTED"
            },
            {
              "status": "ON_HOLD",
              "name": "ON HOLD"
            },
            {
              "status": "ACTIVE",
              "name": "ACTIVE"
            },
            {
              "status": "CLOSED",
              "name": "CLOSED"
            }
          ],
        })
      }, 500)
    })
  }
}
