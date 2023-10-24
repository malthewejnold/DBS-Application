import Api from "@/services/Api";

export default {
  createInstructor(instructor) {
    return Api().post("instructors/create", instructor);
  }
};
