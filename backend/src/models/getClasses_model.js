const con = require("../config/MySQL");

const getClasses_model = async () => {
  const result = await con.query(
    `SELECT lop_hoc.ID, lop_hoc.thu, lop_hoc.gio_bat_dau, lop_hoc.gio_ket_thuc, lop_hoc.phong_hoc, giang_vien.ten, hoc_phan.ten_hoc_phan, hoc_phan.ma_hoc_phan
      FROM lop_hoc
      LEFT JOIN giang_vien ON lop_hoc.GiangVienID = giang_vien.ma_can_bo 
      LEFT JOIN hoc_phan ON lop_hoc.HocPhanID = hoc_phan.ma_hoc_phan;`
  );
  return result[0];
};

module.exports = { getClasses_model };
