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
      <Navbar />
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

function Navbar() {
  return (
    <div className="bg-black/30 backdrop-blur text-gray-200 sticky top-0">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          <div className="w-10 mr-2"></div>
          <div>
            <div className="text-lg font-bold">Zen Tang</div>
            <div className="text-sm text-gray-500">147 tweets</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tweet() {
  return (
    <div className="p-2">
      <div className="flex space-x-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div>
          <div className="text-lg font-bold">Zen Tang</div>
          <div className="text-sm text-gray-500">@zentang</div>
        </div>
      </div>
      <div className="my-2">
        There's a saying in Fintech: You either die a consumer goods company, or
        live long enough to see yourself enter financial services. One company
        has managed to do both. Let me tell you why Starbucks is one of the most
        successful banks in the U.S.:
      </div>
      <div className="text-sm text-gray-500">
        1h · Blue for iPhone · 2/17/23
      </div>
      <div className="flex space-x-4">
        <div className="flex space-x-2">Likes</div>
        <div className="flex space-x-2">Comments</div>
        <div className="flex space-x-2">Remix</div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      {Array(10)
        .fill(100)
        .map((x) => (
          <Tweet />
        ))}
    </>
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
