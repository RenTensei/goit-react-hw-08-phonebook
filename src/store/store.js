import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './slices/contactsReducer';
import { contactsApi } from './slices/contactsApi';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
