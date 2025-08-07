import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// import { worker } from './mocks/browser';
// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }



createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)

