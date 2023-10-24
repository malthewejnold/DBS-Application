import Api from "@/services/Api";

export default {
  getFeedhosts() {
    return Api().get(`feedhosts/all`);
  },
  getoneFeedhost(feedhostId) {
    return Api().get(`feedhosts/get/${feedhostId}`);
  },

  updateFeedhost(feedhost) {
    return Api().put("feedhosts/update", feedhost);
  },

  updateDogName(dogName) {
	  return Api().put("feedhosts/update/dogname", dogName)
  },

  createFeedhost(feedhost) {
    return Api().post("feedhosts/create", feedhost);
  },

  //Delete
  delete(id) {
    return Api().delete(`feedhosts/delete/${id}`);
  }
};
