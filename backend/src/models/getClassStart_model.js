const con = require("../config/MySQL");

const getClassStart_model = async (timing, day) => {
  if (day === 0) day = 8;
  else day = day + 1;
  const result = await con.query(
    `select * from lop_hoc 
     where gio_bat_dau = ? and thu = ?;`,
    [timing, day]
  );
  return result;
};

module.exports = { getClassStart_model };
