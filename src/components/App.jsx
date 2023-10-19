import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Name } from './ContactForm/ContactForm.styled';
import { NameItem } from './ContactForm/ContactForm.styled';

export const App = () => {
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState('');

  const filteredContacts = contacts ? contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  ) : [];

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onAddContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = Math.random().toString(16).slice(2);

    setContacts([...contacts, { id, name, number }]);
  };

  const localStorageContactsKey = 'contacts';

  useEffect(() => {
    const contactsJson = localStorage.getItem(localStorageContactsKey);
    if (contactsJson) {
      const contacts = JSON.parse(contactsJson);
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem(localStorageContactsKey, JSON.stringify(contacts));
    }
  }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        marginLeft: '2.5rem',
      }}
    >
      <Name>Phonebook</Name>
      <ContactForm onSubmitForm={onAddContact} />

      <NameItem>Contacts</NameItem>
      <Filter findByName={setFilter} />
      <ContactList contacts={filteredContacts} onDeleteItem={deleteContact} />
    </div>
  );
};
