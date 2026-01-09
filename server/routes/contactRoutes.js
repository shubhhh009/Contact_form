const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  const contact = new Contact({ name, email, phone, message });
  await contact.save();
  res.status(201).json(contact);
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
