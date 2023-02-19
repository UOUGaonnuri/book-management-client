import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import AppStore from './redux/AppStore'
import { Provider } from 'react-redux'

import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={AppStore}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)
