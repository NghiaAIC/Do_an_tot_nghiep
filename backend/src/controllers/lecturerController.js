const { getLecturer_model } = require("../models/AllLecturer_model");

let getLecturer = async (req, res) => {
  let result = await getLecturer_model();
  return res.json(result);
};

module.exports = { getLecturer };
