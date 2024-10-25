import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import './index.scss'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
