'use client'

import React, { useState, useEffect } from 'react'

interface ContactFormProps {
  productName?: string
  productUrl?: string
}

export default function ContactForm({ productName, productUrl }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    product: productName || '',
    productUrl: productUrl || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (productName) {
      setFormData((prev) => ({ ...prev, product: productName }))
    }
    if (productUrl) {
      setFormData((prev) => ({ ...prev, productUrl: productUrl }))
    }
  }, [productName, productUrl])

  // International phone validation (E.164 format)
  const validatePhone = (phone: string): boolean => {
    // Remove spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-()]/g, '')
    // Check for international format: + followed by 1-15 digits
    const phoneRegex = /^\+[1-9]\d{1,14}$/
    return phoneRegex.test(cleanPhone)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Моля, въведете вашите имена'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Моля, въведете име на фирмата'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Моля, въведете телефонен номер'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Моля, въведете валиден международен телефонен номер (напр. +359 888 123 456)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Моля, въведете имейл адрес'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Моля, въведете валиден имейл адрес'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would send the form data to your backend
      console.log('Form submitted:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      alert('Благодарим ви за запитването! Ще се свържем с вас скоро.')

      // Reset form
      setFormData({
        fullName: '',
        company: '',
        phone: '',
        email: '',
        product: productName || '',
        productUrl: productUrl || '',
      })
    } catch (error) {
      alert('Възникна грешка при изпращането на формата. Моля, опитайте отново.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {productName && (
        <div className="product-inquiry-notice">
          <strong>Запитване за продукт:</strong> {productName}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="fullName">
          1. Вашите Имена <span className="required">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? 'error' : ''}
        />
        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="company">
          2. Име на фирмата <span className="required">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={errors.company ? 'error' : ''}
        />
        {errors.company && <span className="error-message">{errors.company}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          3. Телефонен номер за контакт <span className="required">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+359 888 123 456"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
        <span className="field-hint">Моля, използвайте международен формат (започнете с +)</span>
      </div>

      <div className="form-group">
        <label htmlFor="email">
          4. Имейл адрес <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Изпраща се...' : 'Изпрати запитване'}
      </button>
    </form>
  )
}
