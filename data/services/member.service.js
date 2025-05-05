import { memberMapToViewList } from "../mappers/member.mapper";
import { DAL_CONFIG } from "./config";

export const MemberService = {
  create: (data) => {
    return DAL_CONFIG.member.create(data).then((response) => {
      console.log("Creating New Member =>", data);
      return response;
    })
    
    // return DAL_CONFIG.case.create(data);
  },
  get: (member_uid) => {
    return DAL_CONFIG.member.get(member_uid).then((response) => {
      const { data } = response;
      console.log("current member personal details =>", data);
      return data;
    })
  },
  getAll: () => {
    return DAL_CONFIG.member.getAll().then((response) => {
      const { data } = response;
      console.log("getAll => ", data);
      const dataList = memberMapToViewList(data);
      return Promise.resolve(dataList);
    });
  },
  getMemberCases: (member_uid) => {
    return DAL_CONFIG.member.getMemberCases(member_uid).then((response) => {
      const { data } = response;
      console.log("current member cases =>", data);
      return data;
    })
  },
  getMemberDonations: (member_uid) => {
    return DAL_CONFIG.member.getMemberDonations(member_uid).then((response) => {
      const { data } = response;
      console.log("current member donations =>", data);
      return data;
    })
  },
};
