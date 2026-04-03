import { Routes, Route } from 'react-router-dom'
import MediaContainer from './components/MediaContainer'
import AddMediaPage from './pages/AddMediaPage'
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MediaContainer />} />
        <Route path="/addmedia" element={<AddMediaPage />} />
      </Routes>
    </div>
  )
}

export default App