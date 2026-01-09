import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleContactAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Contact Management App
      </h1>

      <ContactForm onContactAdded={handleContactAdded} />
      <ContactList refresh={refresh} />
    </div>
  );
}

export default App;
