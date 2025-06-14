const con = require("../config/MySQL");

const postClasses_model = async (
  ma_hoc_phan,
  thu,
  gio_bat_dau,
  gio_ket_thuc,
  phong_hoc,
  giang_vien_id
) => {
  const result = await con.query(
    `INSERT INTO lop_hoc (phong_hoc, thu, gio_bat_dau, gio_ket_thuc, GiangVienID, HocPhanID)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [phong_hoc, thu, gio_bat_dau, gio_ket_thuc, giang_vien_id, ma_hoc_phan]
  );
  return result;
};

module.exports = { postClasses_model };
