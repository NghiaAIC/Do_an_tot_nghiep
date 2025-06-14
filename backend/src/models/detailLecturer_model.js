const con = require("../config/MySQL");

const detailLecturer_model = async (ma_can_bo) => {
  let result = await con.query(
    `
      SELECT diem_danh.LopHocID, diem_danh.thoi_gian, diem_danh.hinh_anh, diem_danh.ket_qua
      FROM diem_danh where GiangVienID = ?;
    `,
    [ma_can_bo]
  );
  return result;
};

module.exports = { detailLecturer_model };
