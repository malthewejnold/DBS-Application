import Api from "@/services/Api";

export default {
  getFormGuide(formname) {
    return Api().get(`forms/${formname}`);
  }
};
