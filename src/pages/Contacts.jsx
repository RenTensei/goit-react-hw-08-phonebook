import { Container, Typography } from '@mui/material';
import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';

export const Contacts = () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" fontWeight={500} mb={3}>
        Phonebook
      </Typography>
      <PhonebookForm />

      <Typography variant="h4" fontWeight={500} mb={3} mt={5}>
        Contacts
      </Typography>
      <ContactList />
    </Container>
  );
};
