const mongoose= require("mongoose");
const HealthSchema = new mongoose.Schema({
    heartRate:Number,
    spo2:Number,
    skinTemp:Number,
    riskScore:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports= mongoose.model("HealthData",HealthSchema);