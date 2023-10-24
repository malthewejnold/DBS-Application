import Api from "@/services/Api";

export default {
  //Read
  index() {
    return Api().get("dogs");
  },

  indexWithoutRemoved(){
	return Api().get("dogswithoutremoved");
  },

  getOne(dogid) {
    return Api().get(`dogs/get/${dogid}`);
  },

  findDogsFiltered(search) {
	  return Api().post("dogs/findFiltered", search)
  },

  getMunicipality(){
	  return Api().get("municipality/get");
  },

  //Create
  create(dog) {
    return Api().post("create/dog", dog);
  },
  
  getLast() {
    return Api().get("dogs/last");
  },
  createAxapta(dog){
	  return Api().post("create/dog/axapta", dog)
  },

  //Delete
  delete(dogid) {
    return Api().delete(`dogs/delete/${dogid}`);
  },

  //Update
  updateDog(dog) {
    return Api().put("dogs/update", dog);
  }
};
