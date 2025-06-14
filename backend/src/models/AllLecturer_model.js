const con = require("../config/MySQL");

const getLecturer_model = async () => {
  let [results, fields] = await con.query(
    "SELECT ten, email, khoa_vien, anh, ma_can_bo FROM giang_vien"
  );
  return results;
};

module.exports = {
  getLecturer_model,
};
