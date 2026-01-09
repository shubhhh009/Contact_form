import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/api";
import axios from "axios";

const res = await getContacts();
await deleteContact(id);

const ContactList = ({ refresh }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5001/api/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
   const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
    fetchContacts();
  }, [refresh]);
return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Submitted Contacts</h2>

      {loading && <p>Loading...</p>}

      {!loading && contacts.length === 0 && (
        <p className="text-gray-500">No contacts found</p>
      )}

      {!loading && contacts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{contact.name}</td>
                  <td className="p-2 border">{contact.email}</td>
                  <td className="p-2 border">{contact.phone}</td>
                  <td className="p-2 border">
                    {contact.message || "-"}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;