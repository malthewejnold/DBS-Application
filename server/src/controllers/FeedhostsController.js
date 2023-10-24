const { sequelize } = require("../models/index");
const { FeedHost } = require("../models");

module.exports = {
  //READ
  async getAll(req, res) {
    try {
      const feedhosts = await FeedHost.findAll({
        order: [["feedhost_name", "ASC"]],
      });
      res.send(feedhosts);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getOne(req, res) {
    try {
      const feedhost = await FeedHost.findOne({
        where: { id: req.params.feedhostId },
      });
      res.send(feedhost);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  //UPDATE
  async updateFeedhost(req, res) {
    try {
      await sequelize.query(
        "UPDATE dbo.FeedHosts set dog_no=null, dog_name=null where dog_no=" +
          req.body.dog_no
      );
      await FeedHost.update(req.body, {
        where: { id: req.body.id },
      });

      res.send(`Ansøger med følgende id blev opdateret \n \n${req.body.id}`);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og fodervært blev derfor ikke opdateret \n \n${err}`,
      });
    }
  },
  async updateDogName(req, res) {
    try {
      await sequelize.query(
        "UPDATE dbo.FeedHosts set dog_name='" +
          req.body.dog_name +
          "' where dog_no=" +
          req.body.dog_no
      );
      res.send(`Hundenavnet på førerhunden blev ændret`);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og der blev ikke opdateret \n \n${err}`,
      });
    }
  },
  //CREATE
  async createFeedhost(req, res) {
    try {
      const feedhost = await FeedHost.create(req.body);
      res.send(feedhost);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  //DELETE
  async delete(req, res) {
    try {
      console.log(req.params.id);
      await FeedHost.destroy({ where: { id: req.params.id } });
      res.send("Foderværten blev slettet");
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og foderværten blev derfor ikke slettet \n \n${err}`,
      });
    }
  },
};
