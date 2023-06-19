import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { StyledError, StyledForm } from './Form.styled';
import PropTypes from 'prop-types'; // ES6

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

export const PhonebookForm = ({ addNewContact }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  return (
    <StyledForm>
      <h2>Phonebook</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={addNewContact}
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

PhonebookForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
