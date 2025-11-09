'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import './NewsletterSignup.css'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Моля, въведете валиден имейл адрес')
      return
    }

    setStatus('loading')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Newsletter subscription:', email)

      setStatus('success')
      setMessage('Благодарим ви! Успешно се абонирахте за нашия бюлетин.')
      setEmail('')

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage('Възникна грешка. Моля, опитайте отново.')
    }
  }

  return (
    <div className="newsletter-signup">
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="newsletter-input-wrapper">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Вашият имейл адрес"
            className={`newsletter-input ${status === 'error' ? 'error' : ''}`}
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="newsletter-button"
            disabled={status === 'loading'}
            aria-label="Subscribe to newsletter"
          >
            {status === 'loading' ? (
              <span className="loading-spinner"></span>
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>

        {message && (
          <div className={`newsletter-message ${status}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
