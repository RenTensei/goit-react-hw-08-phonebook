import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { StyledError, StyledForm } from './Form.styled';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'store/slices/contactsApi';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Phone number is required'),
});

const initialValues = {
  name: '',
  number: '',
};

export const PhonebookForm = () => {
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const handleAddContact = async (values, actions) => {
    try {
      const contactExists = contacts.some(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      );

      if (contactExists) {
        toast.error(`${values.name} is already in contacts.`);
        throw new Error('Contact already exists!');
      }

      await addContact(values);
      toast.success(`${values.name} was added!`);
    } catch (error) {
      console.warn(error);
    } finally {
      actions.resetForm();
    }
  };

  return (
    <StyledForm>
      <h2>Phonebook</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddContact}
        validationSchema={schema}
      >
        <Form>
          <label htmlFor="name" className="form-label">
            Name
            <Field type="text" id="name" name="name" placeholder="Alexandro" />
            <StyledError name="name" component="div" />
          </label>

          <label htmlFor="number" className="form-label">
            Number
            <Field
              type="tel"
              id="number"
              name="number"
              placeholder="068-123-45-67"
            />
            <StyledError name="number" component="div" />
          </label>

          <button type="submit">add contact</button>
        </Form>
      </Formik>
    </StyledForm>
  );
};
