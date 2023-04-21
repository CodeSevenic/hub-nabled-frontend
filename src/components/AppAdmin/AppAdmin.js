// AppAdmin.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const AppAdmin = () => {
  const [apps, setApps] = useState([]);
  const [appName, setAppName] = useState('');

  useEffect(() => {
    const appsCollection = collection(db, 'apps');
    const q = query(appsCollection, orderBy('name'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedApps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApps(fetchedApps);
    });

    return () => unsubscribe();
  }, []);

  const handleAddApp = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'apps'), { name: appName });
      setAppName('');
    } catch (error) {
      console.error('Error adding app:', error);
    }
  };

  return (
    <div>
      <h1>HubSpot Apps Admin</h1>
      <form onSubmit={handleAddApp}>
        <input
          type="text"
          placeholder="App name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          required
        />
        <button type="submit">Add App</button>
      </form>
      <ul>
        {apps.map((app) => (
          <li key={app.id}>{app.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppAdmin;
