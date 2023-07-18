import { Button, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactMutation } from 'slices/contactsApi';

export function Contact({ contact: { id, name, number } }) {
  const [deleteContact, { isLoading, isUninitialized }] =
    useDeleteContactMutation();

  const handleDeleteContact = async () => {
    try {
      await deleteContact(id);
      toast.warn(`${name} was deleted!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Paper
      sx={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}
      elevation={6}
    >
      <Typography variant="p" flexGrow={1}>
        {name}: {number}
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteContact}
        disabled={isLoading}
      >
        {isLoading || !isUninitialized ? 'deleting...' : 'delete'}
      </Button>
    </Paper>
  );
}
