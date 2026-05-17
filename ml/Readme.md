ML deployment :  https://cardiac-ml-api.onrender.com
Backend deployment  :https://health-care-detector-3.onrender.com
Predictive Cardiac Health Monitoring System ❤️‍🩹

An AI-powered real-time cardiac health monitoring platform that combines IoT sensor streams, Machine Learning risk prediction, and cloud-based analytics to detect potential cardiac abnormalities early.

🚀 Project Overview

This system continuously monitors patient vitals using IoT sensors and analyzes them using an ML-powered risk engine.

The platform is designed for:

Early cardiac risk detection
Remote patient monitoring
Real-time emergency alerts
AI-assisted healthcare analytics
Smart hospital and wearable integrations
🧠 Core Features

✅ Real-time sensor monitoring
✅ AI-based cardiac risk prediction
✅ REST API architecture
✅ Cloud deployment ready
✅ Socket.IO real-time communication
✅ FastAPI ML inference engine
✅ MongoDB cloud database integration
✅ Scalable microservice architecture

🏗️ System Architecture
IoT Sensors
   ↓
Node.js Backend (Express + Socket.IO)
   ↓
Python ML API (FastAPI)
   ↓
Risk Prediction Engine
   ↓
MongoDB Atlas Cloud Database
   ↓
Frontend Dashboard / Alerts
⚙️ Tech Stack
Backend
Node.js
Express.js
Socket.IO
MongoDB Atlas
Mongoose
Machine Learning API
Python
FastAPI
Scikit-learn
NumPy
Pandas
Cloud Platforms
Render (Backend + ML API)
MongoDB Atlas
📂 Project Structure
project-root/
│
├── server.js
├── package.json
├── routes/
├── controllers/
├── sockets/
├── config/
│
├── ml/
│   ├── app.py
│   ├── requirements.txt
│
└── README.md
🔥 How It Works
1. Sensor Data Collection

IoT devices continuously send:

Heart Rate
SpO2
Body Temperature

to the Node.js backend.

2. Backend Processing

The Express server:

receives sensor data
stores records in MongoDB
forwards health data to the ML API
3. ML Risk Prediction

The FastAPI service analyzes:

abnormal heart rate
oxygen saturation
temperature anomalies

and generates:

risk percentage
cardiac risk level
4. Alert Generation

If abnormal conditions are detected:

high-risk alerts are generated
emergency monitoring can be triggered
📡 API Endpoints
Node Backend
Health Check
GET /
Sensor Data
POST /api/sensor
ML API
Health Check
GET /
Risk Prediction
POST /predict
Sample Request
{
  "heart_rate": 125,
  "spo2": 88,
  "temperature": 39.2
}
Sample Response
{
  "risk_percentage": 80,
  "risk_level": "HIGH"
}
☁️ Deployment
Backend Deployment

Deployed on Render using:

Node.js Runtime
Express Server
ML API Deployment

Deployed separately on Render using:

FastAPI
Uvicorn
Database

MongoDB Atlas cloud database.

🛠️ Local Setup
Backend
npm install
npm start
ML API
cd ml
pip install -r requirements.txt
uvicorn app:app --reload
🌍 Future Improvements
ECG waveform analysis
Deep Learning cardiac prediction
Wearable smartwatch integration
AI anomaly detection
Doctor dashboard
Emergency SMS alerts
Real-time patient analytics
Predictive hospitalization scoring
👩‍💻 Developer

Srishti
Lead Developer & AI System Architect

🏆 Use Cases
Smart Hospitals
Remote Healthcare
Elderly Monitoring
Emergency Response Systems
IoT Healthcare Devices
AI-assisted Clinics
📜 License