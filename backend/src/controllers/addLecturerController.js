const postLecturerModel = require("../models/postLecturer_model");

let postLecturer = async (req, res) => {
  const ma_can_bo = req.body.ma_can_bo;
  const ten = req.body.ten;
  const ID_card = req.body.ID_card;
  const khoa_vien = req.body.don_vi;
  const email = req.body.email;
  const anh = req.body.image;

  let results = await postLecturerModel.postLecturer_model(
    ma_can_bo,
    ten,
    ID_card,
    email,
    khoa_vien.name,
    anh
  );
  console.log(results);
  return res.json(results);
};

module.exports = { postLecturer };
