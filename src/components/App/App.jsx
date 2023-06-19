import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';
import { GlobalStyles } from './App.styled';
import { addContact, deleteContact, updateFilter } from 'store/contactsReducer';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const handleAddContact = (values, actions) => {
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ ...values, id: nanoid() }));

    actions.resetForm();
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleUpdateFilter = event => {
    dispatch(updateFilter(event.target.value));
  };

  const filterContacts = () => {
    return [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <GlobalStyles>
      <PhonebookForm addNewContact={handleAddContact} contacts={contacts} />
      <ContactList
        contacts={filterContacts()}
        updateFilter={handleUpdateFilter}
        deleteSavedContact={handleDeleteContact}
      />
    </GlobalStyles>
  );
};
