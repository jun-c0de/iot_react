import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
  distance: Number,
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Sensor", sensorSchema);
