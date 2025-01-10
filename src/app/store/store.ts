'use client'
import { Action, combineReducers, configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'menu', 'user', 'theme'], // Specify slices to persist
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    user: userReducer,
    theme: themeReducer,


  });
  
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  UnknownAction,
  Action
>;
//export default store;

export const persistor = persistStore(store);