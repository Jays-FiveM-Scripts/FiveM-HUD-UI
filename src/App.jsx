import { createRoot } from 'react-dom/client'


import RightContainer from "./RightContainer"
import LeftContainer from "./LeftContainer"

import './App.css'

function App() {
  return (
    <div className='flex w-full h-full bg-slate-500 justify-between'>
      <LeftContainer />
      <RightContainer />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)