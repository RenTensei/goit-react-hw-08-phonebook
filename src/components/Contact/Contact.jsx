import { toast } from 'react-toastify';
import { useDeleteContactMutation } from 'store/slices/contactsApi';

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
    <li className="contact-item">
      {name}: {number}
      <button onClick={handleDeleteContact} disabled={isLoading}>
        {isLoading || !isUninitialized ? 'deleting...' : 'delete'}
      </button>
    </li>
  );
}
