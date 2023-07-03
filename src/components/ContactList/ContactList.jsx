import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'store/contactsReducer';
import { useGetContactsQuery } from 'store/contactsApi';
import { Contact } from 'components/Contact/Contact';
import { ColorRing } from 'react-loader-spinner';

export const ContactList = () => {
  const dispatch = useDispatch();

  const { data: contacts, isLoading, error } = useGetContactsQuery();

  const filter = useSelector(state => state.contacts.filter);

  const filteredContacts = () => {
    return contacts
      ? [...contacts].filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  };

  return (
    <div>
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <input onChange={event => dispatch(updateFilter(event.target.value))} />
      <ul>
        {isLoading && <ColorRing />}
        {!isLoading &&
          !error &&
          filteredContacts().map(contactData => (
            <Contact key={contactData.id} contact={contactData} />
          ))}
      </ul>
    </div>
  );
};
