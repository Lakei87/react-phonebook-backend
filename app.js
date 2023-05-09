const express = require('express');
const cors = require('cors');
require("dotenv").config();

const { authRouter, contactsRouter } = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Not found" });
});

module.exports = app;