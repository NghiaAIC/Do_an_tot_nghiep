const deleteLecturerModel = require("../models/deleteLecturer_model");

const deleteLecturer = async (req, res) => {
  let results = await deleteLecturerModel.deleteLecturer_model(
    req.params.ma_can_bo
  );
  return res.json(results);
};

module.exports = { deleteLecturer };
