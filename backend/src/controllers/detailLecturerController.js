const { detailLecturer_model } = require("../models/detailLecturer_model");

const detailLecturer = async (req, res) => {
  const ma_can_bo = req.params.id;
  let result = await detailLecturer_model(ma_can_bo);
  return res.json(result[0]);
};

module.exports = { detailLecturer };
