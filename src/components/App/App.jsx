import { ContactList } from 'components/ContactList/ContactList';
import { PhonebookForm } from 'components/Form/Form';
import { GlobalStyles } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <GlobalStyles>
        <PhonebookForm />
        <ContactList />
      </GlobalStyles>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </>
  );
};
