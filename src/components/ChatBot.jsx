import React, { useState, useRef, useEffect } from 'react'
import '../styles/ChatBot.css'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! Ask me about my skills or projects.' }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  // auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput('')

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      })
      const { answer } = await res.json()
      setMessages(m => [...m, { from: 'bot', text: answer }])
    } catch {
      setMessages(m => [...m, { from: 'bot', text: '❌ Sorry, something went wrong.' }])
    }
  }

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle chat"
      >💬</button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              aria-label="Type a message"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything…"
            />
            <button onClick={send} aria-label="Send message">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
