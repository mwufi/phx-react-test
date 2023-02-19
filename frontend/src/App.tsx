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
      <nav style={style}>
        <Link to="/">Home</Link>
        <Link to="/settings">Settings f</Link>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function SettingsPage() {
  const [messages, setMessages] = useState([])
  const addMessage = (message) => setMessages((x) => [...x, message])

  return (
    <div>
      <h1>Better Settings Page</h1>
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

function HomePage() {
  const style = { padding: "8px" }
  return (
    <div style={style}>
      <h1>React TS Home</h1>
      <p>Welcome to the homepage</p>
    </div>
  )
}
export default App
