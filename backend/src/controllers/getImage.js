const fs = require("fs");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const { execFile } = require("child_process");
const con = require("../config/MySQL");
const { url } = require("inspector");
const client = require("../config/Mqtt");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const esp32CamIP = process.env.ESP32_CAM_IP;

const updateAttendanceInfor = async (urlAnh, ket_qua, LopHocID) => {
  if (ket_qua === 4) ket_qua = 0;
  const result = await con.query(
    `UPDATE diem_danh
     SET ket_qua = ?, hinh_anh = ?, thoi_gian = NOW()
     WHERE LopHocID = ? and DATE(thoi_gian) = CURDATE();`,
    [ket_qua, urlAnh, LopHocID]
  );
};

const getImage = async (urlOriginalImage, LopHocID) => {
  try {
    await axios.get(`${esp32CamIP}/capture`);
    const response = await axios.get(`${esp32CamIP}/photo`, {
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data, "binary");
    const filename = `assets/images/photo_${Date.now()}.jpg`;
    fs.writeFileSync(filename, imageBuffer);

    const uploadImage = await cloudinary.uploader.upload(filename, {
      upload_preset: "image_lecturer",
      folder: "attendance_image",
    });

    const urlImageAttendance = uploadImage.url;
    console.log("Ảnh đã upload:", urlImageAttendance);

    execFile(
      "py",
      ["compareImage.py", urlOriginalImage, filename],
      (error, stdout, stderr) => {
        if (error) {
          console.error("fail when call Python:", error);
          return;
        }

        const compareFaceResult = stdout;
        if (compareFaceResult == 4)
          client.publish("HTN/LCD", "Scan again, no face detected");
        else {
          if (compareFaceResult == 1) client.publish("HTN/LCD", "Success");
          else client.publish("HTN/LCD", "Failed!!!");

          updateAttendanceInfor(
            urlImageAttendance,
            compareFaceResult,
            LopHocID
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getImage };
