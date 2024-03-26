import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Auth0Shard } from './Auth0Shard'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Shard>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Auth0Shard>
)
