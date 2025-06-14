import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import "../css/displayLecturer.css";

export default function FruitList(props) {
  const [lecturerList, setLecturerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/lecturer");

      if (!response.ok) {
        throw new Error("Phản hồi mạng không hợp lệ");
      }

      const result = await response.json();
      setLecturerList(result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`${product.anh}`}
        alt={product.anh}
        width="100"
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Danh sách giảng viên</span>
    </div>
  );

  const handleButtonDelete = async (lecturerInfor) => {
    const response = await fetch(
      `http://localhost:8888/api/deleteLecturer/${lecturerInfor.ma_can_bo}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      if (response.ok) console.log("delete success");
      fetchData();
    } catch (error) {
      console.log("delete error");
    }
  };

  const actionBodyTemplate = (lecturerInfor) => {
    return (
      <div className="action_button">
        <Button
          className="detail"
          label="Chi tiết"
          onClick={() => navigate(`/GiangVien/${lecturerInfor.ma_can_bo}`)}
        />
        <Button
          className="delete"
          label="Xóa"
          onClick={() => handleButtonDelete(lecturerInfor)}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={lecturerList}
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column
          field="stt"
          header="STT"
          body={(data, options) => options.rowIndex + 1}
        ></Column>
        <Column field="ten" header="Họ Tên"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="khoa_vien" header="Đơn vị"></Column>
        <Column header="Ảnh" body={imageBodyTemplate}></Column>
        <Column header="Hành động" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
}
