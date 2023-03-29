import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/app'
import Aforo from './pages/aforo'
import Principal from './pages/principal'
import Tables from './pages/tables'
import Main from './pages/main2'
import '@fontsource/fira-sans'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  //   <Principal/>
  // </React.StrictMode>,
    <Main />
)
