import useWindowSize, { WindowSize } from '../useWindowSize'
import { useEffect, useState } from 'react'
import { getBreakpointPixels, getIndexOfLower, getLower, getRatio, getUpper, toArray } from './breakpoints'
import { Breakpoints, BreakpointsParam, BreakpointValue, IndexKey } from '../types/functionTypes'


interface BreakpointsObj {
  br: Breakpoints,
  breakpoints: BreakpointsParam,
  upper: BreakpointValue,
  lower: BreakpointValue,
  indexOfLower: IndexKey,
  ratio: () => number, // in consideration for future intellegent br functionality
  current: WindowSize,
  toArray: () => BreakpointValue[]
}

export const useBreakpoints = (brValues: BreakpointsParam): BreakpointsObj => {
  const windowSize = useWindowSize()
  const [breakpoints, setBreakpoints] = useState({
    br: getBreakpointPixels(brValues),
    breakpoints: brValues,
    upper: getUpper(brValues, windowSize.width ?? 0),
    lower: getLower(brValues, windowSize.width ?? 0),
    indexOfLower: getIndexOfLower(brValues, windowSize.width ?? 0),
    ratio: () => getRatio(brValues, windowSize.width ?? 0), // in consideration for future intellegent br functionality
    current: windowSize,
    toArray: () => toArray(brValues)
  })

  useEffect(() => {
    setBreakpoints({
      br: getBreakpointPixels(brValues),
      breakpoints: brValues,
      upper: getUpper(brValues, windowSize.width ?? 0),
      lower: getLower(brValues, windowSize.width ?? 0),
      indexOfLower: getIndexOfLower(brValues, windowSize.width ?? 0),
      ratio: getRatio(brValues, windowSize.width ?? 0), // in consideration for future intellegent br functionality
      current: windowSize,
      toArray: () => toArray(brValues)
    })
  }, [windowSize, brValues])
  return breakpoints
}

export default useBreakpoints
