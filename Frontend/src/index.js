import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './Style/Auth.css'
import './Style/CompleteProfile.css'
import './Style/Profile.css'
import './Style/MyAccount.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
