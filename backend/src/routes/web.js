const express = require("express");
const homeController = require("../controllers/homeController");
const lecturerController = require("../controllers/lecturerController");
const addLecturerController = require("../controllers/addLecturerController");
const deleteLecturerController = require("../controllers/deleteLecturerController");
const getClassesController = require("../controllers/getClassesController");
const addClassesController = require("../controllers/addClassesController");
const detailLecturerController = require("../controllers/detailLecturerController");
const getImageFromESP = require("../controllers/getImage");
const multer = require("multer");
const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/api/lecturer", lecturerController.getLecturer);
  router.post("/api/addLecturer", addLecturerController.postLecturer);
  router.delete(
    "/api/deleteLecturer/:ma_can_bo",
    deleteLecturerController.deleteLecturer
  );
  router.get("/api/getClasses", getClassesController.getClasses);
  router.post("/api/addClasses", addClassesController.postClasses);
  router.get("/api/attendance/:id", detailLecturerController.detailLecturer);

  return app.use("/", router);
};

module.exports = initWebRoutes;
