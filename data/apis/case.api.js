import { URLs } from "../../utils/path";
import { apiManager } from "../services/api.manager";

export const caseAPI = {
  create: async (data) => {
    const path = URLs.case.create;
    return apiManager.post(path, data, true);
  },
  update: async (data, caseId) => {
    const path = URLs.case.update + caseId + "/";
    return apiManager.put(path, data, true);
  },
  getAll: () => {
    const path = URLs.case.get;
    return apiManager.get(path, true);
  },
  getCaseDetails: (caseId) => {
    const path = URLs.case.get + caseId + "/";
    return apiManager.get(path, true);
  },
  getCaseLogs: (caseId) => {
    const path = URLs.case.caselogs + caseId + "/";
    return apiManager.get(path, true);
  },
  getCaseStatusOptions: () => {
    const path = URLs.case.casestatusoptions;
    return apiManager.get(path, true);
  },
  getCaseTransactions: (caseId) => {
    const path = URLs.case.caseTransactions(caseId);
    return apiManager.get(path, true);
  },
  postTransaction: (data) => {
    const path = URLs.case.postTransaction;
    return apiManager.post(path, data, true);
  },
  verifyTransaction: (data) => {
    const path = URLs.case.verifyTransaction(data.transaction_id);
    return apiManager.put(path, { is_verified: true }, true);
  }
};
