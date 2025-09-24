import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import sensorRouter from "./router/sensor.js"

const PORT = process.env.PORT || 5000;

await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(cors({
    origin: process.env.FRONT_ORIGIN || "*",
    credentials: true
}));
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => res.send("Hello world"));

// 센서 라우트
app.use("/api/sensor", sensorRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
