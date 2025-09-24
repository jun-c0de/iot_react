import express from "express";
import Sensor from "../models/Sensor.js";

const router = express.Router();

// POST /api/sensor
router.post("/", async (req, res) => {
  try {
    const { distance, temperature, humidity } = req.body;
    const data = new Sensor({ distance, temperature, humidity });
    await data.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/sensor
router.get("/", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(50);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
