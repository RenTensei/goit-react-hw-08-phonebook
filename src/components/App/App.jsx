import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';
import { Component } from 'react';
import { GlobalStyles } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewContact = (values, actions) => {
    const contactExists = this.state.contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...values, id: nanoid() }],
    }));

    actions.resetForm();
  };

  deleteSavedContact = id => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }));
  };

  updateFilter = event => {
    this.setState({ filter: event.target.value });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <GlobalStyles>
        <PhonebookForm
          addNewContact={this.addNewContact}
          contacts={this.state.contacts}
        />
        <ContactList
          contacts={filteredContacts}
          updateFilter={this.updateFilter}
          deleteSavedContact={this.deleteSavedContact}
        />
      </GlobalStyles>
    );
  }
}
