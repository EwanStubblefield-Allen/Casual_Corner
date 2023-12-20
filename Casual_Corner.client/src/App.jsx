import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'

export function App() {
  return (
    <div className="App" id="app">
      <header className="position-fixed w-100">
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
