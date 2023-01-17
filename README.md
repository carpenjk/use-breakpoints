# use-breakpoints

UseBreakpoints is React hook that provides values in relation to a set of breakpoints that are useful for conditionally rendering and using responsive properties when used with [prop-x](https://github.com/carpenjk/prop-x)

## Installation

```
  npm i @carpenjk/use-breakpoints
```

## import

```js
  import { useBreakpoints } from '@carpenjk/use-breakpoints
```

## Usage
The useBreakpoints hooks provides access to the breakpoints and related functions and calculated values. It is useful for client side only code that needs to evaluate properties indexed by breakpoints.

```js
const breakpoints: {
    0: 0,
    1: 880,
    2: 1050,
    3: 1200,
    4: 1400,
  }

const br = useBreakpoints(breakpoints);

// assume current window.innerWidth = 1000
//br = 
// {
//   br: [0, 880 , 1050, 1200, 1400],
//   upper: 1050,
//   lower: 880,
//   indexofLower: 1,
//   ratio: 0.838, //(1- (upper - lower) / upper)
//   current: {
//      width: 1000
//      height: 1080
//    }

    // br =
      //new breakpoint object with numerical pixel values
    //   br: {
    //     0: 0,
    //     1: 400,
    //     2: 800,
    //     3: 1200
    //   },
    //   //original breakpoint object
    //   breakpoints: {
    //     0: 0,
    //     1: 880,
    //     2: 1050,
    //     3: 1200,
    //     4: 1400,
    //   },
    //   upper: 1050, 
    //   lower: 880,
    //   indexOfLower: "0",
    //   ratio: 0.838 //1 - (upper - lower) / upper  // in consideration for future intellegent br functionality
    //   current: { width: 1000, height: 1080 },  // window.innerWidth && window.innerHeight
    //   toArray: expect.any(Function)  //array of breakpoints sorted ascendingly
    // });

// }

const indexedPropVal = getIndexedPropValue([100, 200, 300], br.indexOfLower);
// indexedPropVal = 200;

//conditional rendering can be done comparing sizes or with index of lower
if(br.current.width > br.br["2"]){
  return (<SomeComponent>)
}

if(br.indexOfLower = br.br["2"]){
  return (<SomeComponent>)
}

```

## Breakpoint Keys

Due to the way native javascript functionality is defined, breakpoint keys must all appear to be numerical to the javascript compiler or can be alpha-numeric defined in ascending order

```js
  //this is fine
  const breakpoints: {
    0: 0,
    1: 880,
    2: 1050,
    3: 1200,
    4: 1400,
  }

//this is fine
  const breakpoints: {
    zero: 0,
    sm: 880,
    md: 1050,
    lg: 1200,
    xl: 1400,
  }

// this is not ok  (edit: this may be ok because the numerical-like key is the first defined)
    const breakpoints: {
    0: 0,
    sm: 880,
    md: 1050,
    lg: 1200,
    xl: 1400,
  }
```
