import React, { useState, useEffect } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contact') // Your Node.js API route
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {contacts.map((contact, index) => (
        <p key={index}>
          Contact name: {contact.firstname} {contact.lastname}
        </p>
      ))}
    </div>
  );
}

export default Contacts;
