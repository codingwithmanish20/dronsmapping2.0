import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axos from 'axios'
import 'react-toastify/dist/ReactToastify.css';

// to implement the redux toolkit 
import store from './store/store';
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
 <Provider store={store}>
 <ToastContainer
  position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
pauseOnHover
theme="light"  />
      <App />
    </Provider>
  </BrowserRouter>
);



