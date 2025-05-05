export const caseMock = {
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
              uid: '6bb5a75d-14b2-4e99-b068-cbf05cd6a73e',
              name: 'LeFrak Properties',
              number: 'LFP',
              owner: {
                uid: '6a03ffcb-58a6-4607-b90c-ae25fb0ba35a',
                organisationType: 'RECO',
                legalName: 'Lefrak Organization Inc',
                shortName: 'LeFrak Properties',
                registrationDate: null,
                description: null,
                legalStructure: 'CORR',
                entityStatus: 'ACTV',
                logo: null,
                numberOfEmployees: null,
                corporateAddress: null,
                billingAddress: null,
                contacts: [],
              },
              manager: {
                uid: '1ee535d6-be67-488c-95d9-b14c30b50ba4',
                personName: {
                  firstName: 'LeRoi',
                  lastName: 'Isaacs',
                  middleName: null,
                  prefix: null,
                  suffix: null,
                },
                email: {
                  id: 3560,
                  email: 'leroii@cplgroupusa.com',
                  url: null,
                  telex: null,
                },
                phoneNumber: { phoneNumber: '+1 123 789 9822' },
                residence: null,
                residentialStatus: 'RESI',
                businessTitle: null,
                employerIdentification: null,
              },
              contacts: [],
            },
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
  },
  getClientPortfolios: (clientID) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              name: 'Kakapo API Test',
              number: 'ABS NT5',
              owner: {
                uid: clientID,
                organisationType: 'RECO',
                legalName: 'Lefrak Organization Inc',
                shortName: 'LeFrak Properties',
                registrationDate: null,
                description: null,
                legalStructure: 'CORR',
                entityStatus: 'ACTV',
                logo: null,
                numberOfEmployees: null,
                corporateAddress: null,
                billingAddress: null,
                contacts: [],
              },
              manager: {
                uid: '1ee535d6-be67-488c-95d9-b14c30b50ba4',
                personName: {
                  firstName: 'Test',
                  lastName: 'Kontact',
                  middleName: null,
                  prefix: null,
                  suffix: null,
                },
                email: { email: 'testcontact@example.com' },
                phoneNumber: { phoneNumber: '+1 123 789 9822' },
                residence: null,
                residentialStatus: 'RESI',
                businessTitle: 'Asst Managing Director',
                employerIdentification: null,
              },
              contacts: [],
            },
          ],
        })
      }, 500)
    })
  },
}
