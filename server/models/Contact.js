const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{type:String, required:true,trim:true},
    email:{type:String,lowercase: true, required:true,trim:true},
    phone:{type:Number, required:true,trim:true},
    message:{type:String, default: "", trim:true}
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Contact", contactSchema);