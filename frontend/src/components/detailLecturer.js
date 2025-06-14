import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DetailLecturer = () => {
  const ma_can_bo = useParams().id;
  const [lecturer, setLecturer] = useState({});
  const [attendance, setAttendance] = useState([]);

  const lecturerInfor = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/lecturer");

      if (!response.ok) {
        throw new Error("Phản hồi mạng không hợp lệ");
      }

      const result = await response.json();
      for (let i = 0; i < result.length; i++) {
        if (result[i].ma_can_bo === ma_can_bo) {
          console.log(result[i]);
          setLecturer(result[i]);
          break;
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  const attandanceInfor = async () => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/attendance/${ma_can_bo}`
      );
      if (!response.ok) {
        throw new Error("Phản hồi mạng không hợp lệ");
      }
      const result = await response.json();
      setAttendance(result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  const imageBodyTemplate = (hinh_anh) => {
    return (
      <img
        src={`${hinh_anh}`}
        alt={"image"}
        width="275"
        height="200"
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  function resultBodyTemplate(ket_qua) {
    if (ket_qua) return <>Có mặt</>;
    return <>Vắng</>;
  }

  function timeBodyTemplate(time) {
    const date = new Date(time);

    const options = {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formatted = new Intl.DateTimeFormat("vi-VN", options).format(date);
    return <>{formatted}</>;
  }

  useEffect(() => {
    lecturerInfor();
    attandanceInfor();
  }, []);

  return (
    <div style={{ margin: "20px 10px 0px 10px" }}>
      <div style={{ margin: "0px 0px 10px 0px" }}>
        <Link
          to="/GiangVien"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Danh sách giảng viên
        </Link>{" "}
        / {ma_can_bo}
      </div>

      <h3>Thông tin giảng viên</h3>
      <div style={{ display: "flex", gap: "100px" }}>
        <img src={`${lecturer.anh}`} width="210" height="300" />
        <table style={{ width: "400px" }}>
          <tr>
            <td>Mã cán bộ: </td>
            <td>{ma_can_bo}</td>
          </tr>
          <tr>
            <td>Họ tên: </td>
            <td>{lecturer.ten}</td>
          </tr>
          <tr>
            <td>Đơn vị: </td>
            <td>{lecturer.khoa_vien}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{lecturer.email}</td>
          </tr>
        </table>
      </div>

      <h3 style={{ textAlign: "center" }}>Danh sách điểm danh</h3>
      <DataTable value={attendance} tableStyle={{ minWidth: "50rem" }}>
        <Column field="LopHocID" header="Lớp"></Column>
        <Column
          field="thoi_gian"
          header="Ngày điểm danh"
          body={(data, options) => timeBodyTemplate(data.thoi_gian)}
        ></Column>
        <Column
          field="hinh_anh"
          header="Ảnh"
          body={(data, options) => imageBodyTemplate(data.hinh_anh)}
        ></Column>
        <Column
          field="ket_qua"
          header="Điểm danh"
          body={(data, options) => resultBodyTemplate(data.ket_qua)}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DetailLecturer;
