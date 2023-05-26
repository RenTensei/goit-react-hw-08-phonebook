import { useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';
import { GlobalStyles } from './App.styled';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      const contactExists = state.contacts.some(
        contact =>
          contact.name.toLowerCase() === action.payload.name.toLowerCase()
      );

      if (contactExists) {
        alert(`${action.payload.name} is already in contacts.`);
        console.log('alert trigger');
        return state;
      }

      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload, id: nanoid() }],
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };

    case 'UPDATE_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };

    default:
      return state;
  }
};

export const App = () => {
  // тут в принципе редюсер не нужен, но я хотел пощупать его
  const [state, dispatch] = useReducer(reducer, {
    contacts: [],
    filter: '',
  });

  const { contacts, filter } = state;

  useEffect(() => {
    console.log('1');
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (storedContacts) {
      dispatch({ type: 'SET_CONTACTS', payload: storedContacts });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (values, actions) => {
    dispatch({ type: 'ADD_CONTACT', payload: values });
    actions.resetForm();
  };

  const deleteSavedContact = id => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  const updateFilter = event => {
    dispatch({ type: 'UPDATE_FILTER', payload: event.target.value });
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <GlobalStyles>
      <PhonebookForm addNewContact={addNewContact} contacts={contacts} />
      <ContactList
        contacts={filterContacts()}
        updateFilter={updateFilter}
        deleteSavedContact={deleteSavedContact}
      />
    </GlobalStyles>
  );
};
