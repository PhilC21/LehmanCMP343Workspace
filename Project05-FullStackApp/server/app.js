import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await db.pool.query("SELECT NOW()");
        res.status(200).json({
            success: true,
            time: result.rows[0].now,
        });
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            success: false,
            error: "Database connection failed",
        });
    }
});

app.get("/api/media", db.getAllMedia);
app.get("/api/media/:id", db.getMediaById);
app.post("/api/media", db.createMediaItem);
app.put("/api/media/:id", db.updateMediaItem);
app.delete("/api/media/:id", db.deleteMediaItem);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});