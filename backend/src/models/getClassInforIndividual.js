const con = require("../config/MySQL");

const getClassInforIndividual = async (giangVienID, timing, day, phong) => {
  const result = await con.query(
    `select * from lop_hoc 
     where GiangVienID = ? and gio_bat_dau <= ? and gio_ket_thuc >= ? and thu = ? and phong_hoc = ?;`,
    [giangVienID, timing, timing, day, phong]
  );
  return result;
};

module.exports = { getClassInforIndividual };
