const con = require("../config/MySQL");

const deleteLecturer_model = async (ma_can_bo) => {
  let [results, fields] = await con.query(
    "DELETE FROM giang_vien WHERE ma_can_bo = ?",
    ma_can_bo
  );
  return results;
};

module.exports = { deleteLecturer_model };
