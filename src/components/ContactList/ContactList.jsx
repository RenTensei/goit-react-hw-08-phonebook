import PropTypes from 'prop-types'; // ES6

export const ContactList = ({ contacts, updateFilter, deleteSavedContact }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <input onChange={updateFilter}></input>
      <ul>
        {contacts.map(({ name, number, id }) => (
          <li key={id} className="contact-item">
            {name}: {number}
            <button onClick={() => deleteSavedContact(id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateFilter: PropTypes.func.isRequired,
  deleteSavedContact: PropTypes.func.isRequired,
};
