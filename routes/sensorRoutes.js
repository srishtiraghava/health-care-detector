const express = require("express");
const router = express.Router();
const { saveSensorData } = require("../controllers/sensorController");
const { predictRisk } = require("../controllers/mlController");

router.post("/data", saveSensorData);        // IoT → DB
router.post("/predict", predictRisk);        // ML Prediction

module.exports = router;