export const URLs = {
  auth: {
    login: `auth/login/`,
    signup: `auth/register/`,
    otp_code: `auth/verify_otp/`,
    authToken: "auth/token/refresh/",
    logout: "auth/logout/",
  },
  stats: {
    get: "stats/count/",
  },
  case: {
    get: "cases/",
    create: "cases/",
    update: "cases/",
    caselogs: "cases/status/",
    casestatusoptions: "cases/status_options/",
    caseTransactions: (caseId) => `cases/donation/${caseId}/`,
    postTransaction: `cases/donation/`,
    verifyTransaction: (tranxId) => `cases/donation/${tranxId}/`,
  },
  member: {
    getAll: "members/",
    create: "members/",
    get: (member_uid) => `members/${member_uid}/`,
    getMemberCases: (member_uid) => `members/${member_uid}/cases/`,
    getMemberDonations: (member_uid) => `members/${member_uid}/donations/`,
  },
  country: {
    list: "countries/",
  },
  state: {
    get: "states/",
  },
  city: {
    get: "cities/",
  }
};
