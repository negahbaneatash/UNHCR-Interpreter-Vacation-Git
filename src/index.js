import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import './index.css';
import UNLeave from './App';
import reportWebVitals from './reportWebVitals';
import { store, myPersistor } from './redux/store';
// import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
  
  <React.StrictMode>
  {console.log('from index.js ReactDom.render')}  
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={myPersistor}>
        <UNLeave/>
      </PersistGate>    
    </BrowserRouter>        
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
