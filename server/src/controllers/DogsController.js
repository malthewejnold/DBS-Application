const { Dog } = require("../models");
const { sequelize } = require("../models/index");

module.exports = {
  //READ
  async index(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT dbo.dogs.*, axapta.ax_dog_no, axapta.ax_dog_name, LEN(dbo.dogs.status_changes) - LEN(REPLACE(dbo.dogs.status_changes, ',', '')) as status_changes_count FROM dbo.dogs LEFT JOIN dbo.axapta ON dogs.dog_number=axapta.ax_dog_no order by dogs.dog_number DESC"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  async indexWithoutRemoved(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT dbo.dogs.*, axapta.ax_dog_no, axapta.ax_dog_name, LEN(dbo.dogs.status_changes) - LEN(REPLACE(dbo.dogs.status_changes, ',', '')) as status_changes_count FROM dbo.dogs LEFT JOIN dbo.axapta ON dogs.dog_number=axapta.ax_dog_no where dogs.status not in ('Kasseret', 'Aflivet', 'Udgået') order by dogs.dog_number DESC"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  
  async getOne(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT dbo.dogs.*, FeedHosts.id as feedhost_id FROM dbo.dogs LEFT JOIN dbo.FeedHosts ON dogs.dog_number=FeedHosts.dog_no where dog_number=" +
          req.params.dogid
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  async getFiltered(req, res) {
    try {
      let where = {};

      console.log(req.body);

      if (req.body.status != null) {
        where.status = req.body.status;
      }
      if (req.body.race != null) {
        where.race = req.body.race;
      }
      if (req.body.gender != null) {
        where.gender = req.body.gender;
      }
      if (req.body.walk_speed != null) {
        where.walk_speed = req.body.walk_speed;
      }
      if (req.body.temper != null) {
        where.temper = req.body.temper;
      }

      console.log(where);
      const dogs = await Dog.findAll({
        where: where,
      });

      res.send(dogs);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n ${err}`,
      });
    }
  },
  async getMunicipality(req, res) {
    try {
      const [results] = await sequelize.query("SELECT * FROM dbo.municipality");
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  //CREATE
  async create(req, res) {
    try {
      const dog = await Dog.create(req.body);
      res.send(dog);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og hunden blev derfor ikke oprettet \n \n${err}`,
      });
    }
  },

  //Get highest dog_number - used when creating
  async getLast(req, res) {
    try {
      const today = new Date();
      let year = today.getFullYear();
      year = year.toString().substring(2);

      let [lastDogNoQ] = await sequelize.query(
        "SELECT MAX(dog_number) as max FROM dbo.dogs Where dog_number LIKE '" +
          year +
          "%'"
      );

      let lastDogNo = lastDogNoQ[0].max;
      if (lastDogNo == null) {
        lastDogNo = year + "001";
      } else {
        lastDogNo = lastDogNo + 1;
      }
      return res.status(200).send({
        lastNo: lastDogNo,
      });
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  //UPDATE
  async updateDog(req, res) {
    try {
      await Dog.update(req.body, {
        where: { dog_number: req.body.dog_number },
      });

      res.send(
        `Data med følgende hundenummer blev opdateret \n \n${req.body.dog_number}`
      );
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og hunden blev derfor ikke opdateret \n \n${err}`,
      });
    }
  },

  //DELETE (OBSOLETE)
  async delete(req, res) {
    try {
      await Dog.destroy({ where: { dog_number: req.params.dogid } });
      res.send(
        `Data med følgende hundenummer blev slettet \n ${req.params.dogid}`
      );
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og hunden blev derfor ikke slettet \n \n${err}`,
      });
    }
  },
};
