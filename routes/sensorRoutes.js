const express = require("express");
const router = express.Router();
const HealthData = require("../models/HealthData");
const calculateRisk = require("../ml/riskEngine");

router.post("/data", async (req, res) => {
  try {
    const { heartRate, spo2, skinTemp } = req.body;
    //input validation
    if (heartRate==null||spo2==null||skinTemp==null){
      return res.status(400).json({error:"all fields are required"});
    }

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
// Get all data
router.get("/data", async (req, res) => {
  try {
    const allData = await HealthData.find().sort({ createdAt: -1 });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
module.exports = router;