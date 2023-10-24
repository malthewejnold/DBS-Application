const { Applicant } = require("../models");

module.exports = {
  //READ
  async getAll(req, res) {
    try {
      const applicants = await Applicant.findAll({
        order: [["id", "DESC"]],
      });
      res.send(applicants);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getOne(req, res) {
    try {
      const applicant = await Applicant.findOne({
        where: { id: req.params.applicantId },
      });
      res.send(applicant);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  //UPDATE
  async updateApplicant(req, res) {
    try {
      await Applicant.update(req.body, {
        where: { id: req.body.id },
      });

      res.send(`Ansøger med følgende id blev opdateret \n${req.body.id}`);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  //CREATE
  async createApplicant(req, res) {
    try {
      const applicant = await Applicant.create(req.body);
      res.send(applicant);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
};
