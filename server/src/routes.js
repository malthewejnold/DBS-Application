const AuthencationController = require("./controllers/AutheticationController");
const DogsController = require("./controllers/DogsController");
const FormController = require("./controllers/FormController");
const ChartsController = require("./controllers/ChartsController");
const AxaptaController = require("./controllers/AxaptaController");
const FeedhostsController = require("./controllers/FeedhostsController");
const ApplicantsController = require("./controllers/ApplicantsController");
const InstructorsController = require("./controllers/InstructorsController");

module.exports = (app) => {
  //SYSTEM
  app.post("/user/type", AuthencationController.autherize);

  //READ
  app.get("/dogs", DogsController.index);
  app.get("/dogswithoutremoved", DogsController.indexWithoutRemoved)
  app.get("/dogs/last", DogsController.getLast);
  app.get("/dogs/get/:dogid", DogsController.getOne);
  app.post("/dogs/findFiltered", DogsController.getFiltered);
  app.get("/forms/:formname", FormController.getguide);
  app.get("/charts/status", ChartsController.getstatusses);
  app.get("/charts/removedcause", ChartsController.getremovedcause);
  app.get("/charts/training", ChartsController.gettraining);
  app.get("/charts/approval", ChartsController.getapproval);
  app.get("/charts/outplacement", ChartsController.getoutplacement);
  app.get("/charts/outplacementstats", ChartsController.getoutplacementstats);
  app.get("/charts/feedhoststatus", ChartsController.getFeedhostStatus);
  app.get("/applicants/all", ApplicantsController.getAll);
  app.get("/applicants/get/:applicantId", ApplicantsController.getOne);
  app.get("/feedhosts/all", FeedhostsController.getAll);
  app.get("/feedhosts/get/:feedhostId", FeedhostsController.getOne);
  app.get("/municipality/get", DogsController.getMunicipality);

  //CREATE
  app.post("/create/dog", DogsController.create);
  app.post("/create/dog/axapta", AxaptaController.createAxapta);
  app.post("/applicants/create", ApplicantsController.createApplicant);
  app.post("/feedhosts/create", FeedhostsController.createFeedhost);
  app.post("/instructors/create", InstructorsController.createInstructor);

  //UPDATE
  app.put("/dogs/update", DogsController.updateDog);
  app.put("/applicants/update", ApplicantsController.updateApplicant);
  app.put("/feedhosts/update", FeedhostsController.updateFeedhost);
  app.put("/feedhosts/update/dogname", FeedhostsController.updateDogName);

  //DELETE
  app.delete("/feedhosts/delete/:id", FeedhostsController.delete);

  //OBSOLUTE
  app.get("/axapta/list", AxaptaController.getAll);
  app.delete("/dogs/delete/:dogid", DogsController.delete);
  app.post("/login", AuthencationController.login);
};
