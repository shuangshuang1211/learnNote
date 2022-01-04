function myDebounce (handleFn, time) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    setTimeout(() => {
      handleFn(...args);
    }, time);
  }
}