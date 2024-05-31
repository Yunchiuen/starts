import React, { useReducer } from 'react'
import LandingPage from './landing-page/LandingPage'
import Checkout from './checkout/Checkout'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import modeReducer from './reducer/modeReducer'

function App() {
  const [state, dispatch] = useReducer(modeReducer, { mode: 'light' });
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage state={state} dispatch={dispatch} />} />
          <Route path='/checkout' element={<Checkout state={state} dispatch={dispatch} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App