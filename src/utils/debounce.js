/**
 * Creates a debounced function that delays invoking the provided function
 * until after wait milliseconds have elapsed since the last time it was invoked.
 *
 * @param {Function} func The function to debounce
 * @param {number} wait The number of milliseconds to delay
 * @param {boolean} immediate Whether to invoke the function immediately on first call
 * @returns {Function} The debounced function
 */
export function debounce(func, wait, immediate = false) {
  let timeoutId;

  return function (...args) {
    const context = this;

    const later = () => {
      timeoutId = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Alternative version that returns a promise if the debounced function is async
 * Useful for async operations like API calls or image processing
 */
export function asyncDebounce(func, wait, immediate = false) {
  let timeoutId;
  let pendingResolves = [];

  return function (...args) {
    // Clear existing timeout
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      // Add this resolve function to our pending array
      pendingResolves.push(resolve);

      const context = this;

      const later = async () => {
        timeoutId = null;
        if (!immediate) {
          const result = await func.apply(context, args);
          // Resolve all pending promises with the result
          pendingResolves.forEach((r) => r(result));
          pendingResolves = [];
        }
      };

      const callNow = immediate && !timeoutId;
      timeoutId = setTimeout(later, wait);

      if (callNow) {
        (async () => {
          const result = await func.apply(context, args);
          pendingResolves.forEach((r) => r(result));
          pendingResolves = [];
        })();
      }
    });
  };
}
