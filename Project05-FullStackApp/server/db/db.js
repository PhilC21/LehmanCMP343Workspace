import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    : new Pool({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    });

const getAllMedia = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM media_items ORDER BY id ASC");
        res.status(200).json(results.rows);
    } catch (error) {
        console.error("Error getting media items:", error.message);
        res.status(500).json({ error: "Failed to fetch media items" });
    }
};

const getMediaById = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid media item id" });
    }

    try {
        const results = await pool.query("SELECT * FROM media_items WHERE id = $1", [id]);

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Media item not found" });
        }

        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error("Error getting media item by id:", error.message);
        res.status(500).json({ error: "Failed to fetch media item" });
    }
};

const createMediaItem = async (req, res) => {
    const {
        title,
        image_url,
        media_type,
        genre,
        status,
        rating,
        release_year,
        notes,
    } = req.body;

    try {
        const results = await pool.query(
            `INSERT INTO media_items
            (title, image_url, media_type, genre, status, rating, release_year, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [title, image_url, media_type, genre, status, rating, release_year, notes]
        );

        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error("Error creating media item:", error.message);
        res.status(500).json({ error: "Failed to create media item" });
    }
};

const updateMediaItem = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid media item id" });
    }

    const {
        title,
        image_url,
        media_type,
        genre,
        status,
        rating,
        release_year,
        notes,
    } = req.body;

    try {
        const results = await pool.query(
            `UPDATE media_items
            SET title = $1,
                image_url = $2,
                media_type = $3,
                genre = $4,
                status = $5,
                rating = $6,
                release_year = $7,
                notes = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *`,
            [title, image_url, media_type, genre, status, rating, release_year, notes, id]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Media item not found" });
        }

        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error("Error updating media item:", error.message);
        res.status(500).json({ error: "Failed to update media item" });
    }
};

const deleteMediaItem = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid media item id" });
    }

    try {
        const results = await pool.query(
            "DELETE FROM media_items WHERE id = $1 RETURNING *",
            [id]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Media item not found" });
        }

        res.status(200).json({
            message: "Media item deleted successfully",
            deletedItem: results.rows[0],
        });
    } catch (error) {
        console.error("Error deleting media item:", error.message);
        res.status(500).json({ error: "Failed to delete media item" });
    }
};

export default {
    getAllMedia,
    getMediaById,
    createMediaItem,
    updateMediaItem,
    deleteMediaItem,
    pool,
};
