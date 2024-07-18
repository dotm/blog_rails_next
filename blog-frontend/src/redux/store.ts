import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { apiSlice } from './apiSlice'
import { env } from '@/env.mjs'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) { return Promise.resolve(null); },
    setItem(_key: any, value: any) { return Promise.resolve(value); },
    removeItem(_key: any) { return Promise.resolve(); },
  };
};
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();
const localStorageReducer = persistReducer(
  {
    key: 'root',
    storage: storage,
  },
  combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer
  }),
)

export type GlobalRootState = ReturnType<typeof localStorageReducer>;

export const store = configureStore({
  devTools: env.NEXT_PUBLIC_DEPLOYMENT_ENV !== 'production',
  reducer: localStorageReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      apiSlice.middleware,
    ),
})

export const persistor = persistStore(store)