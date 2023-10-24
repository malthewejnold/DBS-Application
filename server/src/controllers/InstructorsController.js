const { Instructor } = require("../models");

module.exports = {
  //CREATE
  async createInstructor(req, res) {
    try {
      const instructor = await Instructor.create(req.body);
      res.send(instructor);
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og lønbilaget blev derfor ikke oprettet \n \n${err}`,
      });
    }
  },
};
