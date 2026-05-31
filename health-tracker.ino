#include <WiFi.h>
#include <WebSocketsClient.h>
#include <Wire.h>
#include <ArduinoJson.h>

#include "MAX30100_PulseOximeter.h"
#include <hd44780.h>
#include <hd44780ioClass/hd44780_I2Cexp.h>

#include <OneWire.h>
#include <DallasTemperature.h>

// ================= WIFI =================
const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";

// ================= WEBSOCKET =================
const char* ws_host = "192.168.1.100";
const uint16_t ws_port = 5000;
const char* ws_path = "/";

WebSocketsClient webSocket;

// ================= DEVICES =================
PulseOximeter pox;
hd44780_I2Cexp lcd;

// ================= TEMP SENSOR =================
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

#define REPORTING_PERIOD_MS 1000
unsigned long lastSend = 0;

// ================= BEAT CALLBACK =================
void onBeatDetected() {
  Serial.println("Beat detected!");
}

// ================= WEBSOCKET EVENTS =================
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  if (type == WStype_CONNECTED)
    Serial.println("WebSocket Connected");

  if (type == WStype_DISCONNECTED)
    Serial.println("WebSocket Disconnected");
}

void setup() {

  Serial.begin(115200);
  delay(1000);

  // ===== I2C =====
  Wire.begin(32, 33);
  Wire.setClock(100000);

  // ===== LCD =====
  int status = lcd.begin(16,2);
  if (status) {
    Serial.print("LCD failed, status=");
    Serial.println(status);
    while (1);
  }
  lcd.backlight();
  lcd.clear();
  lcd.print("Starting...");

  // ===== WIFI =====
  WiFi.begin(ssid, password);
  lcd.setCursor(0,1);
  lcd.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  lcd.clear();
  lcd.print("WiFi Connected");
  delay(1000);

  // ===== WEBSOCKET =====
  webSocket.begin(ws_host, ws_port, ws_path);
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);

  // ===== MAX30100 =====
  if (!pox.begin()) {
    lcd.clear();
    lcd.print("MAX FAIL");
    while (1);
  }

  pox.setIRLedCurrent(MAX30100_LED_CURR_50MA);
  pox.setOnBeatDetectedCallback(onBeatDetected);

  // ===== DS18B20 =====
  tempSensor.begin();

  lcd.clear();
  lcd.print("System Ready");
  delay(1000);
}

void loop() {

  webSocket.loop();
  pox.update();

  if (millis() - lastSend > REPORTING_PERIOD_MS) {

    float heartRate = pox.getHeartRate();
    float spo2 = pox.getSpO2();

    tempSensor.requestTemperatures();
    float bodyTemp = tempSensor.getTempCByIndex(0);

    // ===== LCD DISPLAY =====
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("HR:");
    lcd.print(heartRate,1);

    lcd.setCursor(9,0);
    lcd.print("T:");
    lcd.print(bodyTemp,1);

    lcd.setCursor(0,1);
    lcd.print("SpO2:");
    lcd.print(spo2,1);

    // ===== JSON DATA =====
    StaticJsonDocument<256> doc;
    doc["heartRate"] = heartRate;
    doc["spo2"] = spo2;
    doc["temperature"] = bodyTemp;

    String json;
    serializeJson(doc, json);

    webSocket.sendTXT(json);
    Serial.println(json);

    lastSend = millis();
  }
}