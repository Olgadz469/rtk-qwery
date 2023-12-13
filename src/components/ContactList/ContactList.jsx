import React from 'react';
import { List, Item, Button } from './ContactList.styled';

import { useSelector } from 'react-redux';
import { useDeleteContactMutation } from '../../redux/contactsSlice';

import { useGetContactsQuery } from '../../redux/contactsSlice';
import { selectFilter } from '../../redux/selectors';
import toast from 'react-hot-toast';

const ContactList = contact => {
  const filter = useSelector(selectFilter);
  const { data } = useGetContactsQuery();

  const filteredContacts = () => {
    if (!data) return [];
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContacts = filteredContacts();
  // console.log(visibleContacts);
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async id => {
    try {
      await deleteContact(id);

      toast.success('Contact deleted');
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <Item key={id}>
          {name + ' : ' + number}
          {
            <Button
              type="button"
              name="delete"
              onClick={() => handleDelete(id)}
            >
              delete
            </Button>
          }
        </Item>
      ))}
    </List>
  );
};

export default ContactList;
