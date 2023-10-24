const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

function jwtToken(user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_DAY,
  });
}

module.exports = {
  async autherize(req, res) {
    try {
      const name  = req.body.name;
      const user = await User.findOne({
        where: {
          name: name,
        },
      });
      res.send(user);
    } catch (err) {
      return res.status(503).send({
        error: `Brugeren kunne ikke findes \n \n${err}`,
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "E-email eller adgangskode er forkert",
        });
      }
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(403).send({
          error: "E-email eller adgangskode er forkert",
        });
      }
      const userJson = user.toJSON();
      const sessionToken = jwtToken(userJson);
      res.send({
        user: userJson,
        token: sessionToken,
      });
    } catch (err) {
      return res.status(503).send({
        error: `Der er problemer på serveren og der kan ikke logges ind \n \n${err}`,
      });
    }
  },
};
