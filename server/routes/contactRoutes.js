const express = require("express");
const router = express.Router();

const { createContact,getContact, deleteContact,} = require("../controllers/contactController");

router.post("/", createContact);
router.get("/", getContact);
router.delete("/:id", deleteContact);

module.exports = router;
