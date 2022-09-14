import { useState } from 'react'
import './assets/css/style.css'
import DrawLine from './main/DrawLine'
import SimpleScene from './main/SimpleScene'

function App() {

  return (
    <div className="App">
      <SimpleScene />
      <DrawLine />
    </div>
  )
}

export default App
