import { selectArray, selectContacts } from 'Redux/ContactsSlice';
import { selectFilters } from 'Redux/FilterSlice';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import css from '../ContactList/contactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
function ContactList() {
  const contacts = useSelector(selectContacts);

  const filter = useSelector(selectFilters);
  const filterValue = filter.filters;
  const initialArray = useSelector(selectArray)
  console.log(initialArray);
  return (
    <>
      {initialArray.isLoading  && <p className={css.loader}>Loading data ... </p>}
      {initialArray.error && <p className={css.loader}>{initialArray.error}</p>}
      <ul className={css.listMain}>
        {contacts
          .filter(contact => {
            const searchType = filterValue.toLowerCase();
            const contactType = contact.name.toLowerCase();

            return contactType.includes(searchType);
          })
          .map((contact, index) => {
            return <ContactItem contact={contact} index={index} key={index} />;
          })}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contact: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.number,
    })
  ),
  filter: propTypes.string,
};

export default ContactList;
