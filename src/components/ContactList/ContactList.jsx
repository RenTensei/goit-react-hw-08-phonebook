import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, updateFilter } from 'store/contactsReducer';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleUpdateFilter = event => {
    dispatch(updateFilter(event.target.value));
  };

  const filteredContacts = () => {
    return [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <input onChange={handleUpdateFilter}></input>
      <ul>
        {filteredContacts().map(({ name, number, id }) => (
          <li key={id} className="contact-item">
            {name}: {number}
            <button onClick={() => handleDeleteContact(id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
