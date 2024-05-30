import React from 'react'
import LandingPage from './landing-page/LandingPage'
import Checkout from './checkout/Checkout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App