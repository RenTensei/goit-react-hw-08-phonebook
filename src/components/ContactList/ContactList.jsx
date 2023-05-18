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
