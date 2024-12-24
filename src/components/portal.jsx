import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal({ children }) {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    if (container) return
    const existing = document.getElementById('portal-container')
    if (existing) {
      setContainer(existing)
      return
    }
    const el = document.createElement('div')
    el.id = 'portal-container'
    el.style.position = 'absolute'
    document.body.appendChild(el)
    setContainer(el)
  }, [container])

  return container ? createPortal(children, container) : null
}
