import Api from "@/services/Api";

export default {
  getStatusChartData() {
    return Api().get(`charts/status`);
  },
  getRemovedCauseData() {
    return Api().get(`charts/removedcause`);
  },
  getTraining() {
    return Api().get(`charts/training`);
  },
  getApproval() {
    return Api().get(`charts/approval`);
  },
  getOutplacement() {
    return Api().get(`charts/outplacement`);
  },
  getOutplacementstats() {
    return Api().get(`charts/outplacementstats`);
  },
  getFeedhostStatus() {
	  return Api().get(`charts/feedhoststatus`)
  }
};
