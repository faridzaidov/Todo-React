import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './store/index'
import { Provider } from 'react-redux'

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
root.render(
  // <React.StrictMode >
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)
