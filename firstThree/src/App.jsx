import { useState } from 'react'
import './assets/css/style.css'
import DrawLine from './main/DrawLine'
import SimpleScene from './main/SimpleScene'
import CustomBox from './main/CustomBox'
import Camera from './main/Camera'

function App() {

  return (
    <div className="App">
      {/* <SimpleScene /> */}
      {/* <DrawLine /> */}
      {/* <CustomBox /> */}
      <Camera />
    </div>
  )
}

export default App
