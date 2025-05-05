import {
  caseLogMapToViewList,
  caseMapToViewList,
  caseStatusOptionsMapToViewList,
  caseTransactionsMapToViewList
} from "../mappers/case.mapper";
import { DAL_CONFIG } from "./config";

export const CaseService = {
  create: (data) => {
    console.log("Creating New Case =>", data);
    return DAL_CONFIG.case.create(data);
  },
  update: (data, caseId) => {
    console.log("Updating Case =>", data);
    return DAL_CONFIG.case.update(data, caseId);
  },
  // get: (id) => {
  //   return DAL_CONFIG.portfolio.get(id).then((response) => {
  //     const { data } = response
  //     const dataList = buildingMapToViewList(data)
  //     return Promise.resolve(dataList)
  //   })
  // },
  getAll: () => {
    return DAL_CONFIG.case.getAll().then((response) => {
      const { data } = response;
      console.log("getAll => ", data);
      const dataList = caseMapToViewList(data);
      return Promise.resolve(dataList);
    });
  },
  getCaseDetails: (caseId) => {
    return DAL_CONFIG.case.getCaseDetails(caseId).then((response) => {
      const { data } = response;
      console.log("get case details => ", data);
      return Promise.resolve(data);
    });
  },
  getCaseLogs: (caseId) => {
    return DAL_CONFIG.case.getCaseLogs(caseId).then((response) => {
      const { data } = response;
      console.log("getCaseStatusLogs => ", data);
      const dataList = caseLogMapToViewList(data);
      return Promise.resolve(dataList);
    });
  },
  getCaseStatusOptions: () => {
    return DAL_CONFIG.case.getCaseStatusOptions().then((response) => {
      const { data } = response;
      return Promise.resolve(data);
    });
  },
  getCaseTransactions: (caseId) => {
    return DAL_CONFIG.case.getCaseTransactions(caseId).then((response) => {
      console.log(response);
      const { data } = response;
      console.log("getCaseTransactions => ", data);
      const dataList = caseTransactionsMapToViewList(data);
      return Promise.resolve(dataList);
    });
  },
  postTransaction: (data) => {
    return DAL_CONFIG.case
      .postTransaction(data)
      .then((response) => {
        console.log(response);
        const { data } = response;
        console.log("postTransaction => ", data);
        return Promise.resolve(data);
      });
  },
  verifyTransaction: (data) => {
    return DAL_CONFIG.case
      .verifyTransaction(data)
      .then((response) => {
        console.log(response);
        const { data } = response;
        return Promise.resolve(data);
      });
  }
};
