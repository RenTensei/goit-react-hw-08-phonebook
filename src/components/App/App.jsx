import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';
import { GlobalStyles } from './App.styled';

export const App = () => {
  return (
    <GlobalStyles>
      <PhonebookForm />
      <ContactList />
    </GlobalStyles>
  );
};
