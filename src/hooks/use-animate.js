import { useEffect, useRef } from 'react'

import { useToggle } from './use-toggle'

export function useAnimate(value) {
  const [animate, toggler] = useToggle(false)
  const timeoutRef = useRef()
  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current && value) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      toggler.on()
      timeoutRef.current = setTimeout(() => {
        toggler.off()
      }, 500)
    }
    if (firstRender.current) {
      firstRender.current = false
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [toggler, value])

  return [animate, toggler]
}
