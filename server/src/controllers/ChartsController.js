const { sequelize } = require("../models/index");

module.exports = {
  //READ
  async getstatusses(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT status, count(status) as counts FROM dbo.dogs GROUP by status"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getremovedcause(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT removed_cause, count(removed_cause) as counts FROM dbo.dogs where status='Kasseret' GROUP by removed_cause"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async gettraining(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT DATEPART(yyyy, CONVERT(datetime, training_start)) AS year, COUNT(status) AS count FROM dbo.dogs GROUP BY DATEPART(yyyy, CONVERT(datetime, training_start))"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getapproval(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT DATEPART(yyyy, CONVERT(datetime, approval_date)) AS year, COUNT(status) AS count FROM dbo.dogs WHERE approval_date IS NOT NULL GROUP BY DATEPART(yyyy, CONVERT(datetime, approval_date))"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getoutplacement(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT DATEPART(yyyy, CONVERT(datetime, outplacement)) AS year, COUNT(status) AS count FROM dbo.dogs WHERE outplacement IS NOT NULL GROUP BY DATEPART(yyyy, CONVERT(datetime, outplacement))"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
  async getoutplacementstats(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT race, gender, count(status) as counter from dbo.dogs where status='Udplaceret' group by race,gender order by race"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },

  async getFeedhostStatus(req, res) {
    try {
      const [results] = await sequelize.query(
        "SELECT status, count(status) as counts FROM dbo.feedhosts GROUP by status"
      );
      res.send(results);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
};
