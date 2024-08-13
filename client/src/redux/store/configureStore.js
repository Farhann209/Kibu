import { configureStore, Tuple, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'  // Middleware for logging actions and state changes
import storage from 'redux-persist/lib/storage';  // Default storage (localStorage) for persisting Redux state
import { persistReducer, persistStore } from 'redux-persist';  // Tools for persisting the Redux store
import guestSlice from '../reducerSlice/guestSlice';  // Guest slice reducer
import adminSlice from '../reducerSlice/adminSlice';  // Admin slice reducer
import listingSlice from '../reducerSlice/listingSlice';  // Listing slice reducer

// Configuration for persisting the Redux store
const persistConfig = {
    key: 'root',  // The key for the root of the persisted state in storage
    storage,  // The storage engine to use (e.g., localStorage)
}

// Combine all slice reducers into a root reducer
const rootReducer = combineReducers({ 
    guest: guestSlice,  // Guest slice state
    admin: adminSlice,  // Admin slice state
    listing: listingSlice,  // Listing slice state
})

// Create a persisted reducer using the root reducer and the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
    reducer: persistedReducer,  // Set the root reducer with persistence enabled
    middleware: () => new Tuple(logger),  // Add middleware, including the logger for debugging
})

// Create a persistor to manage the persisting process
export const persistor = persistStore(store)
