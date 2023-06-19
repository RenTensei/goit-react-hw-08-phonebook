import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import contactsReducer from './contactsReducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export const persistor = persistStore(store);
