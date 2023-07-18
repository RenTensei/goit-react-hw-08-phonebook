import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  useAddContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from 'slices/contactsApi';
import { Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleAddContact = async values => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    try {
      if (existingContact) {
        const { id } = existingContact;

        toast.warn(
          `${values.name} is already in contacts, updating phone number...`
        );

        await updateContact({ id, data: values });
        toast.success(`${values.name} phone was updated!`);
        return;
      }
      await addContact(values);
      toast.success(`${values.name} was added!`);
    } catch (error) {
      console.warn(error);
    } finally {
      reset(initialValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddContact)}>
      <Stack spacing={2}>
        <Typography variant="p">Write down new contact's name:</Typography>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              id="name"
              placeholder="Alexandro"
              label="Name"
              size="small"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Typography variant="p">Write down new contact's phone:</Typography>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="tel"
              id="number"
              placeholder="068-123-45-67"
              label="Number"
              size="small"
              error={!!errors.number}
              helperText={errors.number?.message}
            />
          )}
        />

        <Button
          type="submit"
          size="large"
          variant="text"
          color="primary"
          endIcon={<SendIcon />}
        >
          Add contact
        </Button>
      </Stack>
    </form>
  );
};
