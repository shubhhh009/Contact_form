import React, { useState } from "react";
import { createContact } from "../services/api";


const ContactForm = ({ onContactAdded })=>{
    const[ formData , setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        address:""
    });

const [errors , setErrors] = useState({})
const [success , setSuccess] = useState("")

const validate = ()=>{
    const newErrors = {};

    if(!formData.name.trim()){
        newErrors.name = "Name is required";
    }

    if(!formData.email.trim()){
        newErrors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
        newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
    setErrors({})
    setSuccess("")
};

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    if(!validate()) return;
    try {
        await createContact(formData)
         setSuccess("Contact submitted successfully");
         setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      if (onContactAdded) onContactAdded();
    }
    catch (error) {
      console.error(error);
    }
};
 const isFormInvalid = !formData.name || !formData.email || !formData.phone;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Contact Form</h2>

      {success && (
        <p className="mb-3 text-green-600 font-medium">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={isFormInvalid}
          className={`w-full py-2 rounded text-white ${
            isFormInvalid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default ContactForm;