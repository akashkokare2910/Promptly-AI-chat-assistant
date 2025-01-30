// import { configureStore } from "@reduxjs/toolkit";
// import chatReducer from "./chatSlice";

// export const store = configureStore({
//   reducer: {
//     chat: chatReducer,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatReducer from "./chatSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chat"],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, chatReducer);

// Configure the store
// export const store = configureStore({
//   reducer: {
//     chat: persistedReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    chat: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
