import React from 'react'
import LoginHero from './components/LoginHero'
import RegisterHero from './components/RegisterHero'

function App() {
  return (
    <div className="flex flex-col space-y-12">
      <RegisterHero />
      <div className="h-1 bg-gray-300 w-full" />
      <LoginHero />
    </div>
  )
}

export default App
