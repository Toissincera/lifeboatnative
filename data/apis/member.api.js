import { URLs } from "../../utils/path";
import { apiManager } from "../services/api.manager";

export const memberAPI = {
  create: async (data) => {
    const path = URLs.member.create;
    return apiManager.post(path, data, true);
  },
  get: (member_uid) => {
    const path = URLs.member.get(member_uid);
    return apiManager.get(path, true);
  },
  getAll: () => {
    const path = URLs.member.getAll;
    return apiManager.get(path, true);
  },
  getMemberCases: (member_uid) => {
    const path = URLs.member.getMemberCases(member_uid);
    return apiManager.get(path, true);
  },  
  getMemberDonations: (member_uid) => {
    const path = URLs.member.getMemberDonations(member_uid);
    return apiManager.get(path, true);
  },
};
