import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/index.sass'
import UpperCanvas from './components/upperCanvas/UpperCanvas'
import LowerCanvas from './components/lowerCanvas/LowerCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <UpperCanvas />
      </div>
    </>
  )
}

export default App
