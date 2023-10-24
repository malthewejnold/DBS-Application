const { FormGuides } = require("../models");

module.exports = {
  //READ
  async getguide(req, res) {
    try {
      const form = await FormGuides.findOne({
        where: { formName: req.params.formname },
      });
      res.send(form.guide)
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren \n \n${err}`,
      });
    }
  },
};
