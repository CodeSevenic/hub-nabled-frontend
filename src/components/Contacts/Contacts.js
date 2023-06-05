import React, { useState, useEffect } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contacts') // Your Node.js API route
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log('contacts: ', contacts.length);

  return (
    <>
      {contacts.length !== 0 ? (
        <div>
          {contacts.map((contact, index) => (
            <p key={index}>
              Contact name: {contact.firstname} {contact.lastname}
            </p>
          ))}
        </div>
      ) : (
        <div>There are no contacts</div>
      )}
    </>
  );
}

export default Contacts;
