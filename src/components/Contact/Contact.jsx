import { useDeleteContactMutation } from 'store/contactsApi';
import { toast } from 'react-toastify';

export function Contact({ contact: { id, name, number } }) {
  const [deleteContact, { isLoading, isUninitialized, isSuccess }] =
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
      <button onClick={handleDeleteContact}>
        {isLoading || !isUninitialized ? 'deleting...' : 'delete'}
      </button>
    </li>
  );
}
