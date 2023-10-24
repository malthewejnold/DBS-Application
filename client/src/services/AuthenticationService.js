import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  getuser(user) {
	  return Api().post("user/type", user)
  }
};
