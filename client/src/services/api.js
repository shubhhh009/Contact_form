import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api",
})

export const createContact = (data) => API.post("/contacts", data);

export const getContacts = () => API.get("/contacts");

export const deleteContact = (id) => API.delete(`/contacts/${id}`);

export default API;