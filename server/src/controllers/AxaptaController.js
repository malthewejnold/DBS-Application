const { sequelize } = require("../models/index");
const { Axapta } = require("../models");

module.exports = {
  //CREATE
  async createAxapta(req, res) {
    try {
      await Axapta.destroy({ where: { ax_dog_no: req.body.dog_number } });
      const [dog] = await sequelize.query(
        "Insert into dbo.Axapta (ax_dog_name, ax_dog_no) VALUES ('" +
          req.body.dog_name +
          "','" +
          req.body.dog_number +
          "')"
      );
      res.send(dog);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og hunden blev derfor ikke oprettet \n \n${err}`,
      });
    }
  },
  //OBSOLETE
  async getAll(req, res) {
    try {
      const [results] = await sequelize.query("SELECT * FROM dbo.Axapta");
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
};
