import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchWithCredentials } from '../../utils/fetchFunctions';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

function Contacts({ account }) {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) {
      setIsLoading(true);
      fetchWithCredentials(`http://localhost:4000/api/contacts/${account}`)
        .then((contacts) => {
          setContacts(contacts);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [account]);

  if (!account) {
    return null;
  }

  // get user id from session storage
  const userId = sessionStorage.getItem('userId');
  console.log('userId: ', userId);

  // if (!account.features.contacts) {
  //   return <p>The "contacts" feature is not enabled for this account.</p>;
  // }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log('Listed Contacts: ', contacts);

  return (
    <div>
      <h2>Contacts for {account.hubDomain}</h2>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>{contact.properties.firstname}</li>
        ))}
      </ul>

      <FeatureToggle featureName={'contacts'} userId={userId} />
    </div>
  );
}

const UserAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const { hubSpotIds, userData } = useContext(AuthContext);

  console.log('hubSpotIds: ', hubSpotIds);

  const handleChange = (e) => {
    const selectedHubSpotId = hubSpotIds[e.target.value];
    setSelectedAccount(selectedHubSpotId);

    console.log('selectedHubSpotId: ', selectedHubSpotId);
  };

  useEffect(() => {
    console.log('selectedAccount: ', selectedAccount);
  }, [selectedAccount]);

  return (
    <div>
      <select onChange={handleChange}>
        <option>Select an account</option>
        {hubSpotIds.map((id, index) => {
          // Use index as value and id as option text
          // For the option text, we find corresponding account object using id, assuming id is a key in userData.appAuths
          const account = userData.appAuths[id];
          return (
            <option key={id} value={index}>
              {account ? account.hubDomain : id}
            </option>
          );
        })}
      </select>

      {selectedAccount && <Contacts account={selectedAccount} />}
    </div>
  );
};

export default UserAccounts;
