const { getClasses_model } = require("../models/getClasses_model");

const getClasses = async (req, res) => {
  const result = await getClasses_model();
  return res.json(result);
};

module.exports = { getClasses };
