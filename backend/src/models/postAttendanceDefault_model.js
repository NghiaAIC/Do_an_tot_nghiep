const con = require("../config/MySQL");

const postAttendanceDefault_model = async (teachingSchedule) => {
  for (let i = 0; i < teachingSchedule.length; i++) {
    let giangVienID = teachingSchedule[i].GiangVienID;
    let lopHocID = teachingSchedule[i].ID;
    let hinhAnh = null;
    let phongHoc = null;
    let ketQua = false;
    const result = await con.query(
      `
        INSERT INTO diem_danh (GiangVienID, LopHocID, thoi_gian, hinh_anh, phong_hoc, ket_qua)
        VALUES (?, ?, NOW(), ?, ?, ?);
        `,
      [giangVienID, lopHocID, hinhAnh, phongHoc, ketQua]
    );
    console.log(result);
  }
};

module.exports = { postAttendanceDefault_model };
