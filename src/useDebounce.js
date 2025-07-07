import { useState, useEffect } from 'react';

/**
 * A custom React hook that debounces a value.
 * It only updates the returned value if the input value has not changed for a specified delay.
 * @param {*} value The value to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {*} The debounced value.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called...
    // ...if the component unmounts or if the dependencies (value, delay) change.
    // This prevents the state from being updated after the component is gone.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes.

  return debouncedValue;
}




// import { useState, useEffect } from 'react';

// export function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }
