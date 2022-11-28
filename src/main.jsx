import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";

import { applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reducers } from "./store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  { reducer: reducers },
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
