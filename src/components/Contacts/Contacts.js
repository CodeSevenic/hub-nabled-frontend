import React, { useState, useEffect } from 'react';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/contacts', {
      method: 'GET',
      credentials: 'include',
    }) // Your Node.js API route
      .then((res) => {
        console.log('res: ', res);
        // Parse the response as JSON
        return res.json();
      })
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log('contacts: ', contacts);

  return (
    <div className="portal-contacts">
      {contacts && contacts.length > 0 ? (
        <div>
          {contacts.map((contact, index) => (
            <p key={index}>
              Contact name:{' '}
              <b>
                {contact.properties.firstname} {contact.properties.lastname}
              </b>
            </p>
          ))}
        </div>
      ) : (
        <div>There are no contacts</div>
      )}
    </div>
  );
}

export default Contacts;
