const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors({
    origin: "*", // allow all (safe for demo)
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}))
app.use(express.json())

app.use('/api/contacts', contactRoutes)

app.get("/", (req, res) => {
    res.send("Contact Management is running");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB Connected")
})
    .catch((err) => {
        console.error("DB connection failed:", err);
    });

if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
}

module.exports = app;
