import { useRef, useState } from 'react'


export function useControlledValue({ value, defaultValue }) {
  const { current: isControlled } = useRef(value !== undefined)

  const [state, setState] = useState(defaultValue)

  const currentValue = isControlled ? value : state

  function setValue(newValue) {
    if (!isControlled) {
      setState(newValue)
    }
  }

  return [currentValue, setValue]
}
