const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "dance",
      password: bcrypt.hashSync("false", 10)
    }
  ]);
};
