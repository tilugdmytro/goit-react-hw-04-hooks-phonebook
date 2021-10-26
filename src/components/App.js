import { useState, useEffect } from "react";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import ContactList from "./Contacts/ContactList/ContactList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts")) ?? [];
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = window.localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts((contacts) => {
      if (contacts.some((contact) => contact.name === name)) {
        return alert(`${name} is already in contacts!`);
      }
      return setContacts([contact, ...contacts]);
    });
  };

  const deleteContact = (id) => {
    setContacts((state) => state.filter((contact) => contact.id !== id));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  const changeFitler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="title">Phonebook</h2>
      <Form onSubmit={addContact} />
      <h2 className="title">Contacts</h2>
      <Filter value={filter} onChange={changeFitler} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
