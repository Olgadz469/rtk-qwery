import { useGetContactsQuery } from '../redux/contactsSlice';
import { Toaster, toast } from 'react-hot-toast';

import { Container, Title, SubTitle } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  // console.log(data);

  return (
    <Container>
      {isLoading && !error && <p>Request in progress...</p>}
      {error && toast.error('Error')}
      <Title>Phonebook</Title>
      <ContactForm />
      <SubTitle>Contacts</SubTitle>
      {data ? <Filter /> : <p>Your phonebook is empty. Add first contact!</p>}
      {data && <ContactList />}
      <Toaster />
    </Container>
  );
};

export default App;
