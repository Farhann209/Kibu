import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit'

import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import guestSlice from '../reducerSlice/guestSlice';
import adminSlice from '../reducerSlice/adminSlice';
import listingSlice from '../reducerSlice/listingSlice';

const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    guest: guestSlice,
    admin: adminSlice,
    listing: listingSlice,

  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)  
export const store = configureStore({
    reducer: persistedReducer,
  middleware: () => new Tuple( logger),

})

export const persistor = persistStore(store)
