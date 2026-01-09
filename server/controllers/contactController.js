const Contact = require("../models/Contact");

const createContact = async (req, res) => {
    try {
        const { name,
            email,
            phone,
            message
        } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "All Fields are Required"
            })
        }
        const contact = new Contact({
            name, email, phone, message
        })
        await contact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact: contact
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error while creating contact",
            error: error.message,
        })
    }
}

const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({
            message: "Server error while fetching contacts",
            error: error.message
        })
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            })
        }
        res.status(200).json({
            message: "Contact deleted successfully",

        })
    } catch (error) {
        res.status(500).json({
            message: "Server error while deleting contact",
            error: error.message
        })
    }
}
module.exports = { createContact, getContact, deleteContact }
