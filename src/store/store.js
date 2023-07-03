import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contactsReducer';
import { contactsApi } from './contactsApi';

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
