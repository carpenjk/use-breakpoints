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
      // forceUpdate: getSize
    }
  }
  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    if (!isClient) {
      return false
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
