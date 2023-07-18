import { useDispatch, useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
import { updateFilter } from 'slices/contactsReducer';
import { useGetContactsQuery } from 'slices/contactsApi';
import { Contact } from 'components/Contact/Contact';
import { Stack, TextField, Typography } from '@mui/material';

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
    <Stack spacing={2}>
      <Typography variant="p">Find contacts by name:</Typography>

      <TextField
        placeholder="Filter..."
        size="small"
        onChange={event => dispatch(updateFilter(event.target.value))}
      />

      {isLoading && <ColorRing />}
      {!isLoading &&
        !error &&
        filteredContacts().map(contactData => (
          <Contact key={contactData.id} contact={contactData} />
        ))}
    </Stack>
  );
};
