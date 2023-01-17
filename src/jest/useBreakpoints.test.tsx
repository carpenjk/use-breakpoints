import { BreakpointProps } from '@carpenjk/prop-x-types';
import { test, expect, describe } from '@jest/globals';
import { renderHook } from '@testing-library/react'
import useBreakpoint from '../useBreakpoints/useBreakpoints'
const props = {
  theme: {
    breakpoints: {
      0: 0,
      1: 400,
      2: 800,
      3: 1200
    }
  },
  prop1: "value"
};

const { theme: { breakpoints } }: BreakpointProps = props;
const SM_WIDTH = 399;
const MD_WIDTH = 799;
const LG_WIDTH = 1000;
const HEIGHT = 1080

// Function: getBackgroundColor
describe('useBreakpoints', () => {
  test(`SM_WIDTH: ${SM_WIDTH} `, () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: SM_WIDTH,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: HEIGHT,
    });

    let hookResult: any = {}
    hookResult = renderHook(() => useBreakpoint(breakpoints));

    const br = hookResult?.result?.current || {}
    const upper = 400;
    const lower = 0;
    expect(br).toEqual({
      br: {
        0: 0,
        1: 400,
        2: 800,
        3: 1200
      },

      breakpoints: breakpoints,
      upper: upper,
      lower: lower,
      indexOfLower: "0",
      ratio: 1 - (upper - lower) / upper, // in consideration for future intellegent br functionality
      current: { width: SM_WIDTH, height: HEIGHT },
      toArray: expect.any(Function)
    });
    expect(br.toArray())
      .toEqual([0, 400, 800, 1200])
  });

  test(`MD_WIDTH: ${MD_WIDTH} `, () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: MD_WIDTH,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: HEIGHT,
    });

    let hookResult: any = {}
    hookResult = renderHook(() => useBreakpoint(breakpoints));

    const br = hookResult?.result?.current || {}
    const upper = 800;
    const lower = 400;
    expect(br).toEqual({
      br: {
        0: 0,
        1: 400,
        2: 800,
        3: 1200
      },

      breakpoints: breakpoints,
      upper: upper,
      lower: lower,
      indexOfLower: "1",
      ratio: 1 - (upper - lower) / upper, // in consideration for future intellegent br functionality
      current: { width: MD_WIDTH, height: HEIGHT },
      toArray: expect.any(Function)
    });
    expect(br.toArray())
      .toEqual([0, 400, 800, 1200])
  });

  test(`LG_WIDTH: ${LG_WIDTH} `, () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: LG_WIDTH,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: HEIGHT,
    });

    let hookResult: any = {}
    hookResult = renderHook(() => useBreakpoint(breakpoints));

    const br = hookResult?.result?.current || {}
    const upper = 1200;
    const lower = 800;
    expect(br).toEqual({
      br: {
        0: 0,
        1: 400,
        2: 800,
        3: 1200
      },

      breakpoints: breakpoints,
      upper: upper,
      lower: lower,
      indexOfLower: "2",
      ratio: 1 - (upper - lower) / upper, // in consideration for future intellegent br functionality
      current: { width: LG_WIDTH, height: HEIGHT },
      toArray: expect.any(Function)
    });
    expect(br.toArray())
      .toEqual([0, 400, 800, 1200])
  });

  test(`EDGE WIDTH: 800 `, () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: HEIGHT,
    });

    let hookResult: any = {}
    hookResult = renderHook(() => useBreakpoint(breakpoints));

    const br = hookResult?.result?.current || {}
    const upper = 1200;
    const lower = 800;
    expect(br).toEqual({
      br: {
        0: 0,
        1: 400,
        2: 800,
        3: 1200
      },

      breakpoints: breakpoints,
      upper: upper,
      lower: lower,
      indexOfLower: "2",
      ratio: 1 - (upper - lower) / upper, // in consideration for future intellegent br functionality
      current: { width: 800, height: HEIGHT },
      toArray: expect.any(Function)
    });
    expect(br.toArray())
      .toEqual([0, 400, 800, 1200])
  });
});
