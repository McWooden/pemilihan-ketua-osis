import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import MyErrorBoundary from './MyErrorBoundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import Login from './components/login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <MyErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='*' Component={App}/>
            <Route path='/login' Component={Login}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </MyErrorBoundary>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
