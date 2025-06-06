import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './utils/Store.jsx'
import { Provider } from 'react-redux'
import AlertContext from './Contexts/AlertContext.jsx'
createRoot(document.getElementById('root')).render(
  <AlertContext>
  <Provider store={store}>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </Provider>
  </AlertContext>,
)
