import { Button } from "primereact/button";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

function AddClassButton() {
  const [visible, setVisible] = useState(false);
  const [classInfor, setClassInfor] = useState({});

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/addClasses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classInfor),
      });

      if (response.ok) {
        setVisible(false);
        alert("Thêm lớp học thành công");
      }
    } catch (error) {
      alert("Thêm lớp học thất bại!");
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Thoát"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Thêm"
        style={{ background: "#b5101c" }}
        onClick={handleClick}
        autoFocus
      />
    </div>
  );

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setClassInfor((values) => ({ ...values, [name]: value }));
  };

  const handleDayChange = (event) => {
    const name = event.target.name;
    const value = Number(event.target.value);
    setClassInfor((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <Button
        label="Thêm lớp học"
        style={{ background: "#b5101c" }}
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Thêm lớp học"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div id="form">
          <label htmlFor="ma_hoc_phan">Học phần </label>
          <InputText
            name="ma_hoc_phan"
            placeholder="Nhập mã học phần"
            onChange={handleInputChange}
          />
          <label htmlFor="thu">Thứ </label>
          <InputText name="thu" onChange={handleDayChange} />
          <label for="gio_bat_dau">Giờ bắt đầu </label>
          <input
            type="time"
            name="gio_bat_dau"
            onChange={handleInputChange}
          ></input>
          <label for="gio_ket_thuc">Giờ kết thúc </label>
          <input
            type="time"
            name="gio_ket_thuc"
            onChange={handleInputChange}
          ></input>
          <label htmlFor="phong_hoc">Phòng </label>
          <InputText
            name="phong_hoc"
            placeholder="VD: D3-203"
            onChange={handleInputChange}
          />
          <label htmlFor="giang_vien_id">Giảng viên phụ trách</label>
          <InputText
            name="giang_vien_id"
            placeholder="Nhập mã giảng viên"
            onChange={handleInputChange}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default AddClassButton;
