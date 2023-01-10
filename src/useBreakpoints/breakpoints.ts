import { IndexKey, BreakpointsParam, Breakpoints, BreakpointValue } from "../types/functionTypes"


export const getPxValue = (value: string | number): BreakpointValue | null => {
  const regex = /[\d]+/
  //! add functionality around units in the future?
  // @param value: numerical or string value with and without px
  if (typeof value === 'string') {
    const match = value.match(regex)
    return match ? Number(match[0]) : null
  }
  return value
}


export const getBreakpointPixels = (breakpoints: BreakpointsParam): Breakpoints => {
  if (Array.isArray(breakpoints)) {
    return breakpoints.map((br) => Number(getPxValue(br)))
  } else { // must be an object
    return Object.keys(breakpoints).reduce((obj, br) => ({ ...obj, [br]: Number(getPxValue(breakpoints[br])) }), {})
  }
}

export const toArray = (breakpoints: BreakpointsParam): BreakpointValue[] => {
  const brPixels: Breakpoints = getBreakpointPixels(breakpoints)
  const sortFn = (a: number, b: number): number => a - b
  if (Array.isArray(brPixels)) {
    return brPixels.sort(sortFn)
  }
  return Object
    .keys(brPixels)
    .map((k) => brPixels[k])
    .sort(sortFn)
}

export const getUpper = (breakpoints: BreakpointsParam, windowWidth: number): BreakpointValue => {
  // returns next biggest breakpoint widthwise or -1 if no upper can be determined
  const NO_UPPER = -1
  if (typeof breakpoints !== 'object') {
    return NO_UPPER
  }

  const getNearestUp = (prev: BreakpointValue, br: BreakpointValue): BreakpointValue => {
    if (!prev) {
      return br
    }
    const diff: number = br - windowWidth
    return (diff > 0 && diff < prev - windowWidth ? br : prev)
  }
  return toArray(breakpoints)
    .reverse()
    .reduce(getNearestUp)
}

export const getLower = (breakpoints: BreakpointsParam, windowWidth: number): BreakpointValue => {
  // returns next smaller breakpoint widthwise or -1 if no lower can be determined
  const NO_LOWER = -1
  if (typeof breakpoints !== 'object') {
    return NO_LOWER
  }

  const getNearestLow = (prev: BreakpointValue, br: BreakpointValue): BreakpointValue => {
    const diff = windowWidth - br
    return (diff >= 0 && diff < windowWidth - prev ? br : prev)
  }
  return toArray(breakpoints).reduce(getNearestLow)
}

export const getRatio = (breakpoints: BreakpointsParam, windowWidth: number): number => (
  1 - (getUpper(breakpoints, windowWidth) - getLower(breakpoints, windowWidth)) /
  getUpper(breakpoints, windowWidth)
)

// returns the array index or object key of nearest lower breakpoint
export const getIndexOfLower = (breakpoints: BreakpointsParam, windowWidth: number): IndexKey => {
  const brPixels: Breakpoints = getBreakpointPixels(breakpoints)
  if (brPixels.length === 1) {
    return 0
  } else if (Array.isArray(brPixels)) {
    return brPixels.indexOf(getLower(breakpoints, windowWidth))
  } else { // must be obj
    return Object.keys(brPixels).filter((br) => brPixels[br] === getLower(breakpoints, windowWidth))[0]
  }
}
