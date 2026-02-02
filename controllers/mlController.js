const { spawn } = require("child_process");
const path = require("path");

exports.predictRisk = (req, res) => {
  const { heartRate, spo2, temperature } = req.body;

  const scriptPath = path.join(__dirname, "../ml/hrsyndata.py");

  const python = spawn("python", [
    scriptPath,
    heartRate,
    spo2,
    temperature
  ]);

  let result = "";

  python.stdout.on("data", data => {
    result += data.toString();
  });

  python.stderr.on("data", err => {
    console.error("ML Error:", err.toString());
  });

  python.on("close", () => {
    res.json(JSON.parse(result));
  });
};