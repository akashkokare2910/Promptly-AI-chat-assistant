import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import ChatApp from "./component/ChatApp";
import Header from "./component/Header"; // Import Header
import Footer from "./component/Footer"; // Import Footer
import { store, persistor } from "./redux/store"; // Import persistor
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      {/* Wrap your app with PersistGate */}
      <PersistGate loading={null} persistor={persistor}>
        <ChatApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
