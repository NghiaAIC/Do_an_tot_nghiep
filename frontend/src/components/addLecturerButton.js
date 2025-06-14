import { Button } from "primereact/button";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import "../css/formAddLecturer.css";

function ButtonClick() {
  const [visible, setVisible] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState();

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "Khoa Điện tử", code: "ET11" },
    { name: "Khoa Kỹ thuật truyền thông", code: "ET12" },
    { name: "Khoa Tự động hóa", code: "EE2" },
    { name: "Khoa Điện", code: "EE1" },
  ];

  const [lecturerInfor, setlecturerInfor] = useState({});

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/addLecturer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lecturerInfor),
      });
      if (response.ok) {
        setVisible(false);
        alert("thêm giảng viên thành công");
      }
    } catch (error) {
      alert("Thêm giảng viên thất bại!");
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

  const handleDropdown = (event) => {
    setSelectedCity(event.value);
    setlecturerInfor((values) => ({ ...values, ["don_vi"]: event.value }));
  };

  const handleInputFile = async (event) => {
    setLoadingSpiner(true);

    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "image_lecturer");
    formData.append("cloud_name", "dd35l3gpi");
    formData.append("folder", "image_public");

    const response = await fetch(process.env.REACT_APP_API_UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    const uploadedImage = await response.json();
    console.log(uploadedImage.url);

    setlecturerInfor((values) => ({
      ...values,
      ["image"]: uploadedImage.url,
    }));

    if (response.ok) setLoadingSpiner(false);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setlecturerInfor((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <Button
        label="Thêm giảng viên"
        style={{ background: "#b5101c" }}
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Thêm giảng viên"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div id="form">
          <label id="ma_can_bo">Mã cán bộ: </label>
          <InputText name="ma_can_bo" onChange={handleInputChange} />
          <label id="name">Họ tên: </label>
          <InputText name="ten" onChange={handleInputChange} />
          <label name="ID_card">ID thẻ: </label>
          <InputText
            name="ID_card"
            aria-describedby="username-help"
            onChange={handleInputChange}
          />
          <label id="don_vi">Đơn vị: </label>
          <Dropdown
            name="don_vi"
            value={selectedCity}
            onChange={handleDropdown}
            options={cities}
            optionLabel="name"
            placeholder="Đơn vị"
            className="w-full md:w-14rem"
            checkmark={true}
            highlightOnSelect={false}
          />
          <label id="email">Email: </label>
          <InputText
            name="email"
            aria-describedby="username-help"
            onChange={handleInputChange}
          />
          <div id="form_image">
            <label id="image">Ảnh: </label>
            <input type="file" name="image" onChange={handleInputFile} />
            {loadingSpiner && (
              <div>
                <ProgressSpinner
                  style={{ width: "50px", height: "50px" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                />
                uploading...
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ButtonClick;
