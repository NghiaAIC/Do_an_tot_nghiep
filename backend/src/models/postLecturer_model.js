const con = require("../config/MySQL");

const postLecturer_model = async (
  ma_can_bo,
  ten,
  ID_the,
  email,
  khoa_vien,
  anh
) => {
  let [results, fields] = await con.query(
    "INSERT INTO giang_vien (ma_can_bo, ten, ID_the, email, khoa_vien, anh) VALUES (?, ?, ?, ?, ?, ?)",
    [ma_can_bo, ten, ID_the, email, khoa_vien, anh]
  );
  return results;
};

module.exports = { postLecturer_model };
