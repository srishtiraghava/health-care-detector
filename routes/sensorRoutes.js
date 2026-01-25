const express = require("express");
const router = express.Router();
const HealthData = require("../models/HealthData");
const calculateRisk = require("../ml/riskEngine");

router.post("/data", async (req, res) => {
  try {
    const { heartRate, spo2, skinTemp } = req.body;

    const riskScore = calculateRisk({ heartRate, spo2, skinTemp });

    const data = new HealthData({
      heartRate,
      spo2,
      skinTemp,
      riskScore
    });

    await data.save();

    res.json({
      message: "Data saved",
      riskScore,
      status:
        riskScore > 70 ? "HIGH RISK" :
        riskScore > 40 ? "MODERATE" :
        "NORMAL"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;