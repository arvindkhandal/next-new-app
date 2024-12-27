'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';

const Providers = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    // Only create the store on the client
    const storeInstance = makeStore();
    setStore(storeInstance);
  }, []);

  if (!store) {
    // Optionally render a loading state or a fallback UI while the store is being created
    return <div>Loading...</div>;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
