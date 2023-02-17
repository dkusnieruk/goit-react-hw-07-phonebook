import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts, selectContacts } from '../../Redux/ContactsSlice';
import css from '../Contacts/contacts.module.css';
import { useEffect } from 'react';

export function Contacts() {
  
  const inputName = useRef(null);
  const inputNumber = useRef(null);
  const contacts = useSelector(selectContacts);
   const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchContacts())
  }, [dispatch])
  
  const handleAddContact = () => {
    const contactText = inputName.current.value;
    const numberText = inputNumber.current.value;
    
    const checkArray = contacts.filter(contact => {
      const filterArray = contact.name.toLowerCase();
      const filterName = contactText.toLowerCase();

      if (filterArray.includes(filterName)) {
        return true;
      } else return false;
    });

    if (checkArray.length > 0) {
      alert(`Masz już kontakt o imieniu : ${contactText}`);
    }
    else 

    dispatch(
      addContact({
        name: contactText,
        phone: numberText,
      })
    );
    inputName.current.value = '';
    inputNumber.current.value = '';
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact();
  };
  return (
    <>
    
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            ref={inputName}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Add contact"
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            ref={inputNumber}
            className={css.input}
            type="tel"
            name="number"
            placeholder="Add Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.button} type="submit">
          Add Contact
        </button>
      </form>
    </>
  );
}
