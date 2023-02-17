import { Contacts } from 'components/Contacts/Contacts';
import ContactList from './ContactList/ContactList';
import { Filters } from 'components/Filter/Filter';

function App() {
  return (
    <>
      <Contacts />
      <Filters />

      <ContactList />
    </>
  );
}

export default App;
