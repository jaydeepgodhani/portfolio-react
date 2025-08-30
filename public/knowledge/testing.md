Javascript optimisation techniques - https://medium.com/globant/javascript-optimization-techniques-20d8d167dadd

### Debounce

examples to use debounce -> events such as `mousemove` or `window.resize` can trigger hundreds of calls

In Debouncing, if multiple calls to the callback occur within the defined time window, only the last call will be considered for execution and the previous ones will be discarded. Additionally, while this is happening, the time window will also be renewed each time a call occurs. For example, if we define the time as 2 seconds, the callback defined in the `debounce` function will only be executed after 2 seconds. If multiple calls occur within the time window, the time will be renewed for the same period, and only the last function that entered the `debounce` function will be executed once the defined time is met.

```js
const debounce = (callback, time = 300) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, time);
  };
};
```

In this simplified version, the `debounce` function returns another function that will handle the debounce. The returned function clears the timer variable of any previously created timeout and sets a new timeout with the `callback` it received as a parameter. Each time the new debounced function is executed, it will access the same timer variable, clear it, and replace the timeout each time.

How to use debounce function

```js
// this is the function we want to debounce
const showMessage = () => console.log("Hello Message");

// this is the debounced function with 1 second of delay
const debouncedMessage = debounce(showMessage, 1000);

// we are calling it 10000 times in this loop
for (let i = 0; i < 10000; i++) {
  setTimeout(debouncedMessage, i);
}
```

In this example, the `debouncedMessage` function will be called 10,000 times in a `for` loop. However, due to the debounce, the message will only be displayed once instead of 10,000 times

### Throttling

Throttling is a technique similar to debouncing, as both are used to limit the frequency of function calls.

```js
const throttle = (callback, time = 300) => {
  let pause = false;

  return () => {
    if (pause) return;
    pause = true;
    callback();
    setTimeout(() => {
      pause = false;
    }, time);
  };
```

In the case of debouncing

```js
// this is the function we want to throttle
const showMessage = () => console.log("Hello Message");

// this is the throttled function with 1 second of delay
const throttledMessage = throttle(showMessage, 1000);

// we are calling it 10000 times in this loop
for (let i = 0; i < 10000; i++) {
  setTimeout(throttledMessage, i);
}
```
