import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"

const style = { display: "flex", gap: "8px", padding: "8px" }

function fetchstuff() {
  return fetch("/api/info").then((x) => x.json())
}

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // during development, mount on /app
    if (window.location.pathname === "/") {
      window.location.replace("/app")
    }
  }, [])

  return (
    <BrowserRouter basename="app">
      <nav className="p-4 flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/settings">Settings</Link>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <div className="p-4">
      <h1>React TS Home</h1>
      <p>Welcome to the homepage</p>
    </div>
  )
}

function SettingsPage() {
  const [messages, setMessages] = useState([])
  const addMessage = (message) => setMessages((x) => [...x, message])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-yellow-200">Hello world!</h1>
      <button
        onClick={() => {
          fetchstuff().then((x) => {
            addMessage(x.message)
          })
        }}
      >
        Click
      </button>
      <h2>Messages</h2>
      <ul>
        {messages.map((x) => (
          <li>{x}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
