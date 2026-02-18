const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * APIs to be called
 */
const API_ENDPOINTS = [
    "https://sigmadesk-backend.onrender.com/api/health",
    "https://sigmadesk-backend-qs07.onrender.com/api/health",
    "https://sigmadesk-backend-ajrw.onrender.com/api/health",
];

/**
 * Function to hit all APIs
 */
async function hitApis() {
    console.log(`[${new Date().toISOString()}] Cron job started`);

    for (const url of API_ENDPOINTS) {
        try {
            const response = await axios.get(url);
            console.log(`SUCCESS: ${url} → Status ${response.status}`);
        } catch (error) {
            console.error(
                `ERROR: ${url} →`,
                error.response?.status || error.message
            );
        }
    }

    console.log(`[${new Date().toISOString()}] Cron job finished`);
}

cron.schedule("*/30 * * * *", () => {
    hitApis();
});

/**
 * Basic server route
 */
app.get("/", (req, res) => {
    res.send("Node.js Cron Server is running");
});

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
