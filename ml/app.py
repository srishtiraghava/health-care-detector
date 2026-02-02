from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import pickle

app = FastAPI(title="Cardiac Risk ML API")

class SensorInput(BaseModel):
    heart_rate: int
    spo2: int
    temperature: float

@app.get("/")
def root():
    return {"status": "ML API running"}

@app.post("/predict")
def predict(data: SensorInput):
    # TEMP logic (we’ll connect real model next)
    hr = data.heart_rate
    spo2 = data.spo2
    temp = data.temperature

    risk_score = 0
    if hr > 120 or hr < 50:
        risk_score += 1
    if spo2 < 90:
        risk_score += 1
    if temp > 39:
        risk_score += 1

    risk_percent = min(100, risk_score * 40)

    return {
        "risk_percentage": risk_percent,
        "risk_level": "HIGH" if risk_percent > 60 else "MEDIUM" if risk_percent > 30 else "LOW"
    }