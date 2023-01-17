import { BreakpointProps } from '@carpenjk/prop-x-types';
import { beforeEach, afterEach, jest, test, expect } from '@jest/globals';
import { render, act, renderHook, RenderHookResult } from '@testing-library/react'
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

let windowSpy: any;

beforeEach(() => {
  windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
  windowSpy.mockRestore();
});


// function setup(props: BreakpointProps) {
//   const returnVal = {};
//   function TestComponent(): null {
//     Object.assign(returnVal, useBreakpoint(props));
//     return null;
//   }
//   // render(<TestComponent />);

//   // return returnVal;
//   return result;
// }


// Function: getBackgroundColor
test('useBreakpoints', async () => {
  let hookResult: any = {}
  await act(async () => {
    hookResult = renderHook(() => useBreakpoint(breakpoints));
  })
  console.log("🚀 ~ file: useBreakpoints.test.tsX:48 ~ awaitact ~ hookResult", hookResult)
  windowSpy.mockImplementation(() => ({
    innerWidth: 799,
    innerHeight: 1080,
  }));

  // const br = setup(breakpoints)
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
    current: { width: 1024, height: 768 },
    toArray: expect.any(Function)
  });
  // expect(br.toArray())
  //   .toEqual([0, 400, 800, 1200])
});