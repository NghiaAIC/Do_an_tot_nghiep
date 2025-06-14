const { postClasses_model } = require("../models/postClasses_model");

let postClasses = async (req, res) => {
  const ma_hoc_phan = req.body.ma_hoc_phan;
  const thu = req.body.thu;
  const gio_bat_dau = req.body.gio_bat_dau;
  const gio_ket_thuc = req.body.gio_ket_thuc;
  const phong_hoc = req.body.phong_hoc;
  const giang_vien_id = req.body.giang_vien_id;

  let results = await postClasses_model(
    ma_hoc_phan,
    thu,
    gio_bat_dau,
    gio_ket_thuc,
    phong_hoc,
    giang_vien_id
  );
  console.log(results);
  return res.json(results);
};

module.exports = { postClasses };
