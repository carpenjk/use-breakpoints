import { useState, useEffect } from 'react'

export interface WindowSize {
  width: number | void,
  height: number | void
}

function useWindowSize(): WindowSize {
  const isClient = typeof window === 'object'
  function getSize(): WindowSize {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }
  const [windowSize, setWindowSize] = useState<WindowSize>(getSize)
  useEffect(() => {
    if (!isClient) {
      return undefined
    }

    function handleResize() {
      setWindowSize(getSize())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
export default useWindowSize
