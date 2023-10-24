import Api from "@/services/Api";

export default {
  getApplicants() {
    return Api().get(`applicants/all`);
  },
  getoneApplicant(applicantId) {
    return Api().get(`applicants/get/${applicantId}`);
  },

  updateApplicant(applicant){
	  return Api().put("applicants/update", applicant);
  },

  createApplicant(applicant){
	return Api().post("applicants/create", applicant);
}
};
