const HealthData = require("../models/HealthData");

exports.saveSensorData = async (req, res) => {
  try {
    const data = await HealthData.create(req.body);
    res.json({ message: "Sensor data saved", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};