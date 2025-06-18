const express = require("express");
const viewEngine = require("./config/ViewEngine");
const initWebRoutes = require("./routes/web");
const con = require("./config/MySQL");
const cors = require("cors");
const client = require("./config/Mqtt");
const cron = require("node-cron");
const { getClassStart_model } = require("./models/getClassStart_model");
const { getClassInforIndividual } = require("./models/getClassInforIndividual");
const {
  postAttendanceDefault_model,
} = require("./models/postAttendanceDefault_model");
const { getImage } = require("./controllers/getImage");
require("dotenv").config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

viewEngine(app);
initWebRoutes(app);

const handleMessage = async (jsonAttendanceInfor) => {
  let day = null;
  switch (jsonAttendanceInfor.thu) {
    case "Monday":
      day = 2;
      break;
    case "Tuesday":
      day = 3;
      break;
    case "Wednesday":
      day = 4;
      break;
    case "Thursday":
      day = 5;
      break;
    case "Friday":
      day = 6;
      break;
    case "Saturday":
      day = 7;
      break;
    case "Sunday":
      day = 8;
      break;
    default:
  }
  const lecturerResult = await con.query(
    `select * from giang_vien where ID_the = ?;`,
    [jsonAttendanceInfor.id]
  );
  if (lecturerResult[0].length) {
    const result = await getClassInforIndividual(
      lecturerResult[0][0].ma_can_bo,
      jsonAttendanceInfor.thoi_gian,
      day,
      jsonAttendanceInfor.phong
    );
    console.log(result[0][0]);
    if (result[0].length) {
      const compareImageResult = await getImage(
        lecturerResult[0][0].anh,
        result[0][0].ID
      );
    } else {
      client.publish("HTN/LCD", "No class now");
    }
  } else {
    client.publish("HTN/LCD", "Invalid card");
    return;
  }
};

cron.schedule("0 * * * * *", async (req, res) => {
  const gioHienTai = new Date();
  const gio = gioHienTai.getHours();
  const phut = gioHienTai.getMinutes() + 1;
  const timing = gio + ":" + phut + ":" + "00";
  const dayOfWeek = gioHienTai.getDay();
  const result = await getClassStart_model(timing, dayOfWeek);

  if (result[0].length) postAttendanceDefault_model(result[0]);
});

client.on("connect", function () {
  console.log("Connected");
  // subscribe to topic 'HTN/rfid'
  client.subscribe("HTN/rfid");
});

client.on("error", function (error) {
  console.log(error);
});

client.on("message", async function (topic, message) {
  if (topic == "HTN/rfid") {
    // called each time a message is received
    let attendanceInfor = message.toString();
    let jsonAttendanceInfor = JSON.parse(attendanceInfor);
    handleMessage(jsonAttendanceInfor);
  }
});

console.log("port: ", process.env.PORT);
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend nodejs is runing on the port: " + port);
});
