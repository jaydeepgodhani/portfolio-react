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

Throttling is a technique similar to debouncing, as both are used to limit the frequency of function calls. The difference is that throttling does not clear the timer every time the function is called, but instead uses a pause condition to avoid creating new timers. In other words, while the function is being called, it will not wait until the last call to execute, but will only call the function if it enters the time interval where the pause is disabled

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

In the case of debouncing, the message was only displayed once because, in each execution, the timeout was renewed until the last call lasted 10 seconds (10,000 milliseconds). In contrast, for throttling, the message was displayed 10 times, once every second (1000 milliseconds), due to the pause that conditions its execution. As you can see, both techniques have the same goal but are slightly different in code and behaviour. This slight difference allows us to choose one mechanism or another depending on the circumstances

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

### Memoization

```js
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = args.join("-");
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    // you can add a console.log(cache) here to see how cache is being filled.
    return result;
  };
};

const getFactorial = memoize(n => {
  if (n === 1 || n === 0) return 1;
  return n * getFactorial(n - 1);
});

// it runs 100 times
getFactorial(100);

// all values below 100 were memoized previously, so it runs just once
getFactorial(99);
```

Simple example
```js
const memoizAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not a valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};
// returned function from memoizAddition
const addition = memoizAddition();
console.log(addition(20)); //output: 40 calculated
console.log(addition(20)); //output: 40 cached
```

### Lazy Loading

```js
import { lazy } from 'react';

// normal import
import MyNormalComponent from './MyNormalComponent';

// lazy import
const MyLazyComponent = lazy(() => import('./MyLazyComponent'));
```

It is recommended that components imported using `React.lazy` be encapsulated within another React component called [Suspense](https://es.reactjs.org/docs/code-splitting.html#suspense). This component allows us to display a fallback while we wait for the lazy component to load. In this fallback, we can display a message or loading animation to let the user know that something is being loaded.

```js
import { lazy, Suspense } from 'react';
import LoadingAnimation from './LoadingAnimation';

const MyLazyComponent = lazy(() => import('./MyLazyComponent'));

const MyApp = () => {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <MyLazyComponent />
    </Suspense>
  );
};
```

It’s important to note that `React.lazy` can only be used with default exports.
If you have your application built with **_create-react-app_** you can use `React.lazy` in conjunction with [React Router](https://reactrouter.com/en/main), which optimizes the navigation of your application by generating a code splitting by routes automatically. Instead of having to load the entire bundle, the bundle is loaded as you navigate through the application.

Here’s an example of how to use lazy loading with React Router:

```js
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation';

// here we are importing our lazy components
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const About = lazy(() => import('./About'));

const MyApp = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
```

This technique is known as `code splitting`

### Virtualisation (Windowing)

This technique is especially useful for components that display large amounts of data, such as tables. By only rendering the rows and columns that are currently visible, or when we scroll to big list, only visible portion is rendered and below all data is not rendered for smoother experience

### Error Boundaries

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) catch errors during rendering, lifecycle methods, and constructors of the whole tree below them. It’s important to note that error boundaries do not catch errors for event handlers, asynchronous code, or errors that occur in the error boundary itself. You can find more details about error boundaries [here](https://reactjs.org/docs/error-boundaries.html).

```js
import { PureComponent } from 'react';

export class ErrorBoundaries extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    // this is similar to => this.setState({ hasError: true })
    return { hasError: true, errorInfo: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo, this.state.errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // this could return the children or anything else: this.props.children;
    return (
      <div>
        This is the main returned component with no error yet.
      </div>
    )
  }
}
```

### Inline Functions

Avoid inline function. why ?
1. **Performance**: Every time a component is rendered in React, all inline functions are recreated. This can lead to slower performance in your application, especially if you have many components with inline functions.
2. **Maintenance**: Inline functions are defined within the component and cannot be reused in other parts of the application. This can make the code more difficult to maintain as the application grows.
3. **Readability**: Inline functions can make code more difficult to read and understand, especially if they are long or have many arguments.

```js

import { useState } from "react";

export const InlineFunctions = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>{counter}</h1>
      <button
        onClick={() => {
          setCounter((prevCount) => prevCount + 1);
        }}
      >
        Increase Counter
      </button>
      <button
        onClick={() => {
          setCounter((prevCount) => prevCount - 1);
        }}
      >
        Decrease Counter
      </button>
    </div>
  );
};
```

In this case, would be to define a separate function for handling the click event and then use that function as a callback for the `onClick` event of each button. This way, the function is not recreated every time the component is rendered, improving performance

```js

import { useState } from "react";

export const InlineFunctions = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = (value) => () => {
    setCounter((prevCount) => prevCount + value);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleClick(1)}>Increase Counter</button>
      <button onClick={handleClick(-1)}>Decrease Counter</button>
    </div>
  );
};
```

### Pure Function
A **Pure function** is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value.
```js
//Impure
let numberArray = [];
const impureAddNumber = (number) => numberArray.push(number);
//Pure
const pureAddNumber = (number) => (argNumberArray) =>
  argNumberArray.concat([number]);

//Display the results
console.log(impureAddNumber(6)); // returns 1
console.log(numberArray); // returns [6]
console.log(pureAddNumber(7)(numberArray)); // returns [6, 7]
console.log(numberArray); // returns [6]
```
As per the above code snippets, the **Push** function is impure itself by altering the array and returning a push number index independent of the parameter value, whereas **Concat** on the other hand takes the array and concatenates it with the other array producing a whole new array without side effects. Also, the return value is a concatenation of the previous array.

### First Class Function
In Javascript, functions are first class objects. First-class functions means when functions in that language are treated like any other variable.

For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable. For example, in the below example, handler functions assigned to a listener

```js
const handler = () => console.log("This is a click handler function");
document.addEventListener("click", handler);
```

### First Order Function
A first-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.
```js
const firstOrder = () => console.log("I am a first order function!");
```

### Higher Order Function
A higher-order function is a function that accepts another function as an argument or returns a function as a return value or both.
```js
const firstOrderFunc = () =>
  console.log("Hello, I am a First order function");
const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
higherOrder(firstOrderFunc);
```

### Let Var Let
The `let` statement declares a **block scope local variable**. Hence the variables defined with let keyword are limited in scope to the block, statement, or expression on which it is used. Whereas variables declared with the `var` keyword used to define a variable globally, or locally to an entire function regardless of block scope.
```js
let counter = 30;
if (counter === 30) {
  let counter = 31;
  console.log(counter); // 31
}
console.log(counter); // 30 (because the variable in if block won't exist here)
```

Difference between Let and Var
|var|let|
|---|---|
|It has been available from the beginning of JavaScript|Introduced as part of ES6|
|It has function scope|It has block scope|
|Variable declaration will be hoisted|Hoisted but not initialized|
|It is possible to re-declare the variable in the same scope|It is not possible to re-declare the variable|

```js
function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible due to function scope)
  console.log(age); //error: age is not defined(due to block scope)
}
userDetails("John");
```

### Call Bind Apply
when inside a function if you print `this` then you'll get `window` object, but what if you want this to be some other object of your choice, call bind and apply is for that.
medium link - https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb
```js
function abcd(a, b, c) {
	console.log(a+b+c);
	console.log(this); // this will refer to window object
}
var myObj = {
	name: "JD"
}
abcd.call(myObj, a, b, b) // now, abcd's this will refer to myObj
abcd.apply(myObj, [a, b, c]) // only difference between call and apply is, apply always expects second argument as array
var myNewFunc = abcd.bind(myObj, a, b, c); // bind will give you new function instead of calling it instantly
```

### Currying

If you have a function which takes multiple arguments, you can break it down into series of functions which takes one argument each. Currying is named after a mathematician **Haskell Curry**. By applying currying, an n-ary function turns into a unary function.
```js
// normal function
function sum(val1, val2) {
	return val1 + val2
}
// usage
var summ = sum(2,5)
// currying example
function add(val1) {
	return function(val2) {
		return val1 + val2;
	}
}
// usage
var func2 = add(2)
var ans = func2(5)
```
shorter example
```js
const curryUnaryFunction = (a) => (b) => (c) => a + b + c;
curryUnaryFunction(1); // returns a function: b => c =>  1 + b + c
curryUnaryFunction(1)(2); // returns a function: c => 3 + c
curryUnaryFunction(1)(2)(3); // returns the number 6
```

### TDZ Temporal Dead Zone
The Temporal Dead Zone(TDZ) is a specific period or area of a block where a variable is inaccessible until it has been intialized with a value. This behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. In ECMAScript 6, accessing a `let` or `const` variable before its declaration (within its scope) causes a ReferenceError.

### Closure
A closure is the combination of a function and the lexical environment within which that function was declared
In closure, there is parent function which might contain data/variables which can be accessed by child function present inside it, parent function always returns child function in closure.

```js
function parent(a) {
	var someVal = a+2;
	return function(b) { // this returning function can change parent variable's someVal value
		someVal++;
	}
}
```
simple example
```js
function Welcome(name) {
  var greetingInfo = function (message) {
    console.log(message + " " + name);
  };
  return greetingInfo;
}
var myFunction = Welcome("John");
myFunction("Welcome "); //Output: Welcome John
myFunction("Hello Mr."); //output: Hello Mr. John
```

### Event Loop
Event loop checks if the main stack is empty and moves code from side stack(all async code) to main stack for execution.
The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack is empty. If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are added to the end of the event queue.

**Note:** The event loop allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded, by offloading operations to the system kernel whenever possible. Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background.

### Splice & Slice

|Slice|Splice|
|---|---|
|Doesn't modify the original array(immutable)|Modifies the original array(mutable)|
|Returns the subset of original array|Returns the deleted elements as array|
|Used to pick the elements from array|Used to insert/delete elements to/from array|

```js

// slice
let arrayIntegers = [1, 2, 3, 4, 5];
let arrayIntegers1 = arrayIntegers.slice(0, 2); // returns [1,2]
let arrayIntegers2 = arrayIntegers.slice(2, 3); // returns [3]
let arrayIntegers3 = arrayIntegers.slice(4); //returns [5]

// splice
let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];

let arrayIntegers1 = arrayIntegersOriginal1.splice(0, 2); // returns [1, 2]; original array: [3, 4, 5]
let arrayIntegers2 = arrayIntegersOriginal2.splice(3); // returns [4, 5]; original array: [1, 2, 3]
let arrayIntegers3 = arrayIntegersOriginal3.splice(3, 1, "a", "b", "c"); //returns [4]; original array: [1, 2, 3, "a", "b", "c", 5]
```

### Encode/Decode URL
`encodeURI()` function is used to encode an URL. This function requires a URL string as a parameter and return that encoded string. `decodeURI()` function is used to decode an URL. This function requires an encoded URL string as parameter and return that decoded string.

**Note:** If you want to encode characters such as `/ ? : @ & = + $ #` then you need to use `encodeURIComponent()`
```js
let uri = "employeeDetails?name=john&occupation=manager";
let encoded_uri = encodeURI(uri);
let decoded_uri = decodeURI(encoded_uri);
```
### Classes in ES6
In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance. For example, the prototype based inheritance written in function expression as below
```js
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};
```
Whereas ES6 classes can be defined as an alternative
```js
class Bike {
  constructor(color, model) {
    this.color = color;
    this.model = model;
  }

  getDetails() {
    return this.model + " bike has" + this.color + " color";
  }
}
```
### Service Worker
A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.
Service worker can't access the DOM directly. But it can communicate with the pages it controls by responding to messages sent via the `postMessage` interface, and those pages can manipulate the DOM

### Promise
A promise is an object that may produce a single value some time in the future with either a resolved value or a reason that it’s not resolved(for example, network error). It will be in one of the 3 possible states: fulfilled (settled), rejected (settled), or pending.
```js
const promise = new Promise(
  (resolve) => {
    setTimeout(() => {
      resolve("I'm a Promise!");
    }, 5000);
  },
  (reject) => {}
);

promise.then((value) => console.log(value));
```

#### Promise Chaining
```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 3;
  })
  .then(function (result) {
    console.log(result); // 6
    return result * 4;
  });
```
#### Promise.all
Promise.all is a promise that takes an array of promises as an input (an iterable), and it gets resolved when all the promises get resolved or any one of them gets rejected. **Note:** Remember that the order of the promises(output the result) is maintained as per input order.
```js
Promise.all([Promise1, Promise2, Promise3]) .then(result) => {   console.log(result) }) .catch(error => console.log(`Error in promises ${error}`))
```
#### Prmoise.race
Promise.race() method will return the promise instance which is firstly resolved or rejected. Let's take an example of race() method where promise2 is resolved first
```js
var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two" // Both promises will resolve, but promise2 is faster
});
```


### Callback

A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action. Let's take a simple example of how to use callback function
```js
function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(callbackFunction);
```

### Need Of Callback Functions
The callbacks are needed because javascript is an event driven language. That means instead of waiting for a response javascript will keep executing while listening for other events. Let's take an example with the first function invoking an API call(simulated by setTimeout) and the next function which logs the message.
```js
function firstFunction() {
  // Simulate a code delay
  setTimeout(function () {
    console.log("First function called");
  }, 1000);
}
function secondFunction() {
  console.log("Second function called");
}
firstFunction();
secondFunction();

Output;
// Second function called
// First function called
```
As observed from the output, javascript didn't wait for the response of the first function and the remaining code block got executed. So callbacks are used in a way to make sure that certain code doesn’t execute until the other code finishes execution.

### Callback Hell
Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,
```js
async1(function(){
    async2(function(){
        async3(function(){
            async4(function(){
                ....
            });
        });
    });
});
```

### Check for various Supports

support for localStorage/sessionStorage
```js
if (typeof Storage !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  // Sorry! No Web Storage support..
}
```
support for webWorker
```js
if (typeof Worker !== "undefined") {
  // code for Web worker support.
} else {
  // Sorry! No Web Worker support..
}
```
support for server sent events (SSE). SSE is a server push technology enabling a browser to receive automatic updates from a server via HTTP connection without resorting to polling. These are a one way communications channel - events flow from server to client only. This has been used in Facebook/Twitter updates, stock price updates, news feeds etc.
```js
if (typeof EventSource !== "undefined") {
  // Server-sent events supported. Let's have some code here!
} else {
  // No server-sent events supported
}
```

### window vs document

|Window|Document|
|---|---|
|It is the root level element in any web page|It is the direct child of the window object. This is also known as Document Object Model(DOM)|
|By default window object is available implicitly in the page|You can access it via window.document or document.|
|It has methods like alert(), confirm() and properties like document, location|It provides methods like getElementById, getElementsByTagName, createElement etc|

### Global Variable

Global variables are those that are available throughout the length of the code without any scope. The var keyword is used to declare a local variable but if you omit it then it will become global variable. The problem with global variables is the conflict of variable names of local and global scope. It is also difficult to debug and test the code that relies on global variables.
`msg = "Hello"; // var is missing, it becomes global variable`

### NaN

The NaN property is a global property that represents "Not-a-Number" value. i.e, It indicates that a value is not a legal number. It is very rare to use NaN in a program but it can be used as return value for few cases. You can check for NaN like `isNaN("hello") \\ true`
```js
Math.sqrt(-1);
parseInt("Hello");
```

### void 0

Void(0) is used to prevent the page from refreshing. This will be helpful to eliminate the unwanted side-effect, because it will return the undefined primitive value. It is commonly used for HTML documents that use href="JavaScript:Void(0);" within an `<a>` element. i.e, when you click a link, the browser loads a new page or refreshes the same page. But this behavior will be prevented using this expression. For example, the below link notify the message without reloading the page

```html
<a href="JavaScript:void(0);" onclick="alert('Well done!')">
  Click Me!
</a>
```

### preventDefault

The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.
**Note:** Remember that not all events are cancelable.

```js
document
  .getElementById("link")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
```

### stopPropagation

The stopPropagation method is used to stop the event from bubbling up the event chain. For example, the below nested divs with stopPropagation method prevents default event propagation when clicking on nested div(Div1)
```js
<p>Click DIV1 Element</p>
<div onclick="secondFunc()">DIV 2
  <div onclick="firstFunc(event)">DIV 1</div>
</div>

<script>
function firstFunc(event) {
  alert("DIV 1");
  event.stopPropagation();
}

function secondFunc() {
  alert("DIV 2");
}
</script>
```

### Get Query String Values

You can use URLSearchParams to get query string values in javascript. Let's see an example to get the client code value from URL query string.

```js
const urlParams = new URLSearchParams(window.location.search);
const clientCode = urlParams.get("clientCode");
```

### Key Exists in an Object

```js
// 1.
"key" in obj // key exist in obj
!("key" in obj) // key does not exist in obj

// 2.
obj.hasOwnProperty("key"); // true

//3.
const user = {
  name: "John",
};

console.log(user.name !== undefined); // true
console.log(user.nickName !== undefined); // false
```

### Loop Through or Enumerate Javascript Object

You can use the `for-in` loop to loop through javascript object. You can also make sure that the key you get is an actual property of an object, and doesn't come from the prototype using `hasOwnProperty` method.

```js
var object = {
  k1: "value1",
  k2: "value2",
  k3: "value3",
};

for (var key in object) {
  if (object.hasOwnProperty(key)) {
    console.log(key + " -> " + object[key]); // k1 -> value1 ...
  }
}
```

### Test for an Empty Object

```js
Object.entries(obj).length === 0 && obj.constructor === Object; // Since date object length is 0, you need to check constructor check as well
```

### Arguments object

The arguments object is an Array-like object accessible inside functions that contains the values of the arguments passed to that function. For example, let's see how to use arguments object inside sum function.
**Note:** You can't apply array methods on arguments object. But you can convert into a regular array as below.

```js
function sum() {
  var total = 0;
  for (var i = 0, len = arguments.length; i < len; ++i) {
    total += arguments[i];
  }
  return total;
}

sum(1, 2, 3); // returns 6
```

### assign default values to variables

You can use the logical or operator `||` in an assignment expression to provide a default value. The syntax looks like as below. As per the above expression, variable 'a 'will get the value of 'c' only if 'b' is falsy (if is null, false, undefined, 0, empty string, or NaN), otherwise 'a' will get the value of 'b'.
```js
var a = b || c;
```

### Number of Parameters expected by a function

You can use `function.length` syntax to find the number of parameters expected by a function. Let's take an example of `sum` function to calculate the sum of numbers.
```js
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
sum.length; // 4 is the number of parameters expected.
```

### Synchronous HTTP Request

Browsers provide an XMLHttpRequest object which can be used to make synchronous HTTP requests from JavaScript
```js
function httpGet(theUrl) {
  var xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", theUrl, false); // false for synchronous request
  xmlHttpReq.send(null);
  return xmlHttpReq.responseText;
}
```

### execute javascript after page load

```js
window.onload = function ...

document.onload = function ...

<body onload="script();">
```

### determine two values same or not using object

The Object.is() method determines whether two values are the same value. For example, the usage with different types of values would be
```js
Object.is("hello", "hello"); // true
Object.is(window, window); // true
Object.is([], []); // false
```

Two values are the same if one of the following holds:

1. both undefined
2. both null
3. both true or both false
4. both strings of the same length with the same characters in the same order
5. both the same object (means both object have same reference)
6. both numbers and both +0 both -0 both NaN both non-zero and both not NaN and both have the same value.

### copy properties from one object to other

You can use the Object.assign() method which is used to copy the values and properties from one or more source objects to a target object. It returns the target object which has properties and values copied from the source objects. The syntax would be as below,

```js
Object.assign(target, ...sources);
```

Let's take example with one source and one target object,

```js
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }

console.log(returnedTarget); // { a: 1, b: 3, c: 4 }
```

As observed in the above code, there is a common property(`b`) from source to target so it's value has been overwritten.
Below are the some of main applications of Object.assign() method,
1. It is used for cloning an object.
2. It is used to merge objects with the same properties.

### What is a WeakSet

WeakSet is used to store a collection of weakly(weak references) held objects. The syntax would be as follows,

```js
new WeakSet([iterable]);
```

Let's see the below example to explain it's behavior,

```js
var ws = new WeakSet();
var user = {};
ws.add(user);
ws.has(user); // true
ws.delete(user); // removes user from the set
ws.has(user); // false, user has been removed
```

### What are the differences between WeakSet and Set

The main difference is that references to objects in Set are strong while references to objects in WeakSet are weak. i.e, An object in WeakSet can be garbage collected if there is no other reference to it. Other differences are,

1. Sets can store any value Whereas WeakSets can store only collections of objects
2. WeakSet does not have size property unlike Set
3. WeakSet does not have methods such as clear, keys, values, entries, forEach.
4. WeakSet is not iterable.

Let's see the functionality of all the available methods in an example,

```js
var weakSetObject = new WeakSet();
var firstObject = {};
var secondObject = {};
// add(value)
weakSetObject.add(firstObject);
weakSetObject.add(secondObject);
console.log(weakSetObject.has(firstObject)); //true
weakSetObject.delete(secondObject);
```

### What are the function parameter rules

JavaScript functions follow below rules for parameters,

1. The function definitions do not specify data types for parameters.
2. Do not perform type checking on the passed arguments.
3. Do not check the number of arguments received. i.e, The below function follows the above rules,

```js
function functionName(parameter1, parameter2, parameter3) {
  console.log(parameter1); // 1
}
functionName(1);
```

### event loop

[](https://github.com/sudheerj/javascript-interview-questions?tab=readme-ov-file#what-is-an-event-loop)The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack is empty. If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are added to the end of the event queue.

### event queue

[](https://github.com/sudheerj/javascript-interview-questions?tab=readme-ov-file#what-is-an-event-queue)The event queue follows the queue data structure. It stores async callbacks to be added to the call stack. It is also known as the Callback Queue or Macrotask Queue.

Whenever the call stack receives an async function, it is moved into the Web API. Based on the function, Web API executes it and awaits the result. Once it is finished, it moves the callback into the event queue (the callback of the promise is moved into the microtask queue).

The event loop constantly checks whether or not the call stack is empty. Once the call stack is empty and there is a callback in the event queue, the event loop moves the callback into the call stack. But if there is a callback in the microtask queue as well, it is moved first. The microtask queue has a higher priority than the event queue.

### What is an Unary operator

The unary(+) operator is used to convert a variable to a number.If the variable cannot be converted, it will still become a number but with the value NaN. Let's see this behavior in an action.

```js
var x = "100";
var y = +x;
console.log(typeof x, typeof y); // string, number

var a = "Hello";
var b = +a;
console.log(typeof a, typeof b, b); // string, number, NaN
```

### What is the purpose of compareFunction while sorting arrays

The compareFunction is used to define the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. Let's take an example to see the usage of compareFunction,

```js
let numbers = [1, 2, 5, 3, 4];
numbers.sort((a, b) => b - a);
console.log(numbers); // [5, 4, 3, 2, 1]
```

### How do you get the prototype of an object

You can use the `Object.getPrototypeOf(obj)` method to return the prototype of the specified object. i.e. The value of the internal `prototype` property. If there are no inherited properties then `null` value is returned.

```js
const newPrototype = {};
const newObject = Object.create(newPrototype);

console.log(Object.getPrototypeOf(newObject) === newPrototype); // true
```

### How do you define multiple properties on an object

The `Object.defineProperties()` method is used to define new or modify existing properties directly on an object and returning the object. Let's define multiple properties on an empty object,

```js
const newObject = {};

Object.defineProperties(newObject, {
  newProperty1: {
    value: "John",
    writable: true,
  },
  newProperty2: {},
});
```

### What Is Obfuscation in javascript

Obfuscation is the deliberate act of creating obfuscated javascript code(i.e, source or machine code) that is difficult for humans to understand. It is something similar to encryption, but a machine can understand the code and execute it. Let's see the below function before Obfuscation,

```js
function greeting() {
  console.log("Hello, welcome to JS world");
}
```

And after the code Obfuscation, it would be appeared as below,

```js
eval(
  (function (p, a, c, k, e, d) {
    e = function (c) {
      return c;
    };
    if (!"".replace(/^/, String)) {
      while (c--) {
        d[c] = k[c] || c;
      }
      k = [
        function (e) {
          return d[e];
        },
      ];
      e = function () {
        return "\\w+";
      };
      c = 1;
    }
    while (c--) {
      if (k[c]) {
        p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
      }
    }
    return p;
  })(
    "2 1(){0.3('4, 7 6 5 8')}",
    9,
    9,
    "console|greeting|function|log|Hello|JS|to|welcome|world".split("|"),
    0,
    {}
  )
);

```

### Why do you need Obfuscation

Below are the few reasons for Obfuscation,

1. The Code size will be reduced. So data transfers between server and client will be fast.
2. It hides the business logic from outside world and protects the code from others
3. Reverse engineering is highly difficult
4. The download time will be reduced

### How do you list all properties of an object

You can use the `Object.getOwnPropertyNames()` method which returns an array of all properties found directly in a given object. Let's the usage of it in an example,

```js
const newObject = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(newObject));
["a", "b", "c"];
```

### How do you get property descriptors of an object

You can use the `Object.getOwnPropertyDescriptors()` method which returns all own property descriptors of a given object. The example usage of this method is below,

```js
const newObject = {
  a: 1,
  b: 2,
  c: 3,
};
const descriptorsObject = Object.getOwnPropertyDescriptors(newObject);
console.log(descriptorsObject.a.writable); //true
console.log(descriptorsObject.a.configurable); //true
console.log(descriptorsObject.a.enumerable); //true
console.log(descriptorsObject.a.value); // 1
```

### What are the attributes provided by a property descriptor

A property descriptor is a record which has the following attributes

1. value: The value associated with the property
2. writable: Determines whether the value associated with the property can be changed or not
3. configurable: Returns true if the type of this property descriptor can be changed and if the property can be deleted from the corresponding object.
4. enumerable: Determines whether the property appears during enumeration of the properties on the corresponding object or not.
5. set: A function which serves as a setter for the property
6. get: A function which serves as a getter for the property

### How do you compare scalar arrays

You can use length and every method of arrays to compare two scalar(compared directly using ===) arrays. The combination of these expressions can give the expected result,

```js
const arrayFirst = [1, 2, 3, 4, 5];
const arraySecond = [1, 2, 3, 4, 5];
console.log(
  arrayFirst.length === arraySecond.length &&
    arrayFirst.every((value, index) => value === arraySecond[index])
); // true
```

If you would like to compare arrays irrespective of order then you should sort them before,

```js
const arrayFirst = [2, 3, 1, 4, 5];
const arraySecond = [1, 2, 3, 4, 5];
console.log(
  arrayFirst.length === arraySecond.length &&
    arrayFirst.sort().every((value, index) => value === arraySecond[index])
); //true
```

### How to get the value from get parameters

The `new URL()` object accepts the url string and `searchParams` property of this object can be used to access the get parameters. Remember that you may need to use polyfill or `window.location` to access the URL in older browsers(including IE).

```js
let urlString = "http://www.some-domain.com/about.html?x=1&y=2&z=3"; //window.location.href
let url = new URL(urlString);
let parameterZ = url.searchParams.get("z");
console.log(parameterZ); // 3
```

### How do you print numbers with commas as thousand separators

You can use the `Number.prototype.toLocaleString()` method which returns a string with a language-sensitive representation such as thousand separator, currency etc of this number.

```js
function convertToThousandFormat(x) {
  return x.toLocaleString(); // 12,345.679
}

console.log(convertToThousandFormat(12345.6789));
```

### How do you load CSS and JS files dynamically

You can create both link and script elements in the DOM and append them as child to head tag. Let's create a function to add script and style resources as below,

```js
function loadAssets(filename, filetype) {
  if (filetype == "css") {
    // External CSS file
    var fileReference = document.createElement("link");
    fileReference.setAttribute("rel", "stylesheet");
    fileReference.setAttribute("type", "text/css");
    fileReference.setAttribute("href", filename);
  } else if (filetype == "js") {
    // External JavaScript file
    var fileReference = document.createElement("script");
    fileReference.setAttribute("type", "text/javascript");
    fileReference.setAttribute("src", filename);
  }
  if (typeof fileReference != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileReference);
}
```

### What is a void operator

The `void` operator evaluates the given expression and then returns undefined(i.e, without returning value). The syntax would be as below,

```js
void expression;
void expression;
```

Let's display a message without any redirection or reload

```js
<a href="javascript:void(alert('Welcome to JS world'))">
  Click here to see a message
</a>
```

**Note:** This operator is often used to obtain the undefined primitive value, using "void(0)".

### What is the output of below for loops

```js
for (var i = 0; i < 4; i++) {
  // global scope
  setTimeout(() => console.log(i));
}

for (let i = 0; i < 4; i++) {
  // block scope
  setTimeout(() => console.log(i));
}
```

The output of the above for loops is 4 4 4 4 and 0 1 2 3

**Explanation:** Due to the event queue/loop of javascript, the `setTimeout` callback function is called after the loop has been executed. Since the variable i is declared with the `var` keyword it became a global variable and the value was equal to 4 using iteration when the time `setTimeout` function is invoked. Hence, the output of the first loop is `4 4 4 4`.

Whereas in the second loop, the variable i is declared as the `let` keyword it becomes a block scoped variable and it holds a new value(0, 1 ,2 3) for each iteration. Hence, the output of the first loop is `0 1 2 3`.

### What is destructuring assignment

The destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables. Let's get the month values from an array using destructuring assignment

```js
var [one, two, three] = ["JAN", "FEB", "MARCH"];

console.log(one); // "JAN"
console.log(two); // "FEB"
console.log(three); // "MARCH"
```

and you can get user properties of an object using destructuring assignment,

```js
var { name, age } = { name: "John", age: 32 };

console.log(name); // John
console.log(age); // 32
```

### What are default values in destructuring assignment

A variable can be assigned a default value when the value unpacked from the array or object is undefined during destructuring assignment. It helps to avoid setting default values separately for each assignment. Let's take an example for both arrays and object use cases,

*Arrays Destructuring*

```js
var x, y, z;

[x = 2, y = 4, z = 6] = [10];
console.log(x); // 10
console.log(y); // 4
console.log(z); // 6
```

*Objects Destructuring*

```js
var { x = 2, y = 4, z = 6 } = { x: 10 };

console.log(x); // 10
console.log(y); // 4
console.log(z); // 6
```

```js
// swap values using destructuring
var x = 10,
  y = 20;

[x, y] = [y, x];
console.log(x); // 20
console.log(y); // 10
```

### What are enhanced object literals

Object literals make it easy to quickly create objects with properties inside the curly braces. For example, it provides shorter syntax for common object property definition as below.

```js
//ES6
var x = 10,
  y = 20;
obj = { x, y };
console.log(obj); // {x: 10, y:20}
//ES5
var x = 10,
  y = 20;
obj = { x: x, y: y };
console.log(obj); // {x: 10, y:20}
```

### What is for...of statement

The for...of statement creates a loop iterating over iterable objects or elements such as built-in String, Array, Array-like objects (like arguments or NodeList), TypedArray, Map, Set, and user-defined iterables. The basic usage of for...of statement on arrays would be as below,

```js
let arrayIterable = [10, 20, 30, 40, 50];

for (let value of arrayIterable) {
  value++;
  console.log(value); // 11 21 31 41 51
}
```

### What is the output of below function calls

**Code snippet:**

```js
const circle = {
  radius: 20,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
```

console.log(circle.diameter());
console.log(circle.perimeter());

**Output:**

The output is 40 and NaN. Remember that diameter is a regular function, whereas the value of perimeter is an arrow function. The `this` keyword of a regular function(i.e, diameter) refers to the surrounding scope which is a class(i.e, Shape object). Whereas this keyword of perimeter function refers to the surrounding scope which is a window object. Since there is no radius property on window objects it returns an undefined value and the multiple of number value returns NaN value.

### How do you remove falsy values from an array

You can apply the filter method on the array by passing Boolean as a parameter. This way it removes all falsy values(0, undefined, null, false and "") from the array.

```js
const myArray = [false, null, 1, 5, undefined];
myArray.filter(Boolean); // [1, 5] // is same as myArray.filter(x => x);
```

### How do you get unique values of an array

You can get unique values of an array with the combination of `Set` and rest expression/spread(...) syntax.

```js
console.log([...new Set([1, 2, 4, 4, 3])]); // [1, 2, 4, 3]
```

### What is babel

Babel is a JavaScript transpiler to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Some of the main features are listed below,

1. Transform syntax
2. Polyfill features that are missing in your target environment (using @babel/polyfill)
3. Source code transformations (or codemods)

### What is the difference between Function constructor and function declaration

The functions which are created with `Function constructor` do not create closures to their creation contexts but they are always created in the global scope. i.e, the function can access its own local variables and global scope variables only. Whereas function declarations can access outer function variables(closures) too.

Let's see this difference with an example,

**Function Constructor:**

```js
var a = 100;
function createFunction() {
  var a = 200;
  return new Function("return a;");
}
console.log(createFunction()()); // 100
```

**Function declaration:**

```js
var a = 100;
function createFunction() {
  var a = 200;
  return function func() {
    return a;
  };
}
console.log(createFunction()()); // 200
```

### What are the differences between spread operator and rest parameter

Rest parameter collects all remaining elements into an array. Whereas Spread operator allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements. i.e, Rest parameter is opposite to the spread operator.

### What are the differences between for...of and for...in statements

Both for...in and for...of statements iterate over js data structures. The only difference is over what they iterate:

1. for..in iterates over all enumerable property keys of an object
2. for..of iterates over the values of an iterable object.

Let's explain this difference with an example,

```js
let arr = ["a", "b", "c"];

arr.newProp = "newVlue";

// key are the property keys
for (let key in arr) {
  console.log(key); // 0, 1, 2 & newValue
}

// value are the property values
for (let value of arr) {
  console.log(value); // a, b, c
}
```

Since for..in loop iterates over the keys of the object, the first loop logs 0, 1, 2 and newProp while iterating over the array object. The for..of loop iterates over the values of a arr data structure and logs a, b, c in the console.

### What is the easiest way to ignore promise errors?

The easiest and safest way to ignore promise errors is void that error. This approach is ESLint friendly too.

```js
await promise.catch((e) => void e);
```

### What is nullish coalescing operator (??)?

It is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. This can be contrasted with the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined.

```js
console.log(null ?? true); // true
console.log(false ?? true); // false
console.log(undefined ?? true); // true
```

### What is the difference between setTimeout, setImmediate and process.nextTick?

1. **Set Timeout:** setTimeout() is to schedule execution of a one-time callback after delay milliseconds.
2. **Set Immediate:** The setImmediate function is used to execute a function right after the current event loop finishes.
3. **Process NextTick:** If process.nextTick() is called in a given phase, all the callbacks passed to process.nextTick() will be resolved before the event loop continues. This will block the event loop and create I/O Starvation if process.nextTick() is called recursively.

### Debouncing

Debouncing is a programming pattern that allows delaying execution of some piece of code until a specified time to avoid unnecessary _CPU cycles, API calls and improve performance_. The debounce function make sure that your code is only triggered once per user input. The common usecases are Search box suggestions, text-field auto-saves, and eliminating double-button clicks.

Let's say you want to show suggestions for a search query, but only after a visitor has finished typing it. So here you write a debounce function where the user keeps writing the characters with in 500ms then previous timer cleared out using `clearTimeout` and reschedule API call/DB query for a new time—300 ms in the future.

```js
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
function fetchResults() {
  console.log("Fetching input suggestions");
}
const processChange = debounce(() => fetchResults());
```

The _debounce()_ function can be used on input, button and window events

**Input:**

```html
<input type="text" onkeyup="processChange()" />
```

**Button:**

```html
<button onclick="processChange()">Click me</button>
```

**Windows event:**

```html
window.addEventListener("scroll", processChange);
```

### Throttling

Throttling is a technique used to limit the execution of an event handler function, even when this event triggers continuously due to user actions. The common use cases are browser resizing, window scrolling etc.

The below example creates a throttle function to reduce the number of events for each pixel change and trigger scroll event for each 100ms except for the first event.

```js
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
window.addEventListener("scroll", () => {
  throttle(handleScrollAnimation, 100);
});
```

### Optional Chaining

According to MDN official docs, the optional chaining operator (?.) permits reading the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid.

The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.

```js
const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

451. ### What is the purpose of the this keyword in JavaScript?

- The `this` keyword in JavaScript is a special variable that is used within a function to refer to the object on which the function is invoked. The value of this depends on how the function is called. It allows functions to access and interact with the object they are bound to.
- The this keyword in JavaScript is a reference to the object that owns or invokes the current function. Its value is determined by the calling context. **Example 1: this in a Global Context**

```js
console.log(this);
```

- In a global context, this refers to the global object (e.g., window in a browser).

**Example 2: this in a Function**

```js
function displayThis() {
  console.log(this);
}

displayThis();
```

- In a regular function, this refers to the global object.

**Example 3: this in a Method**

```js
const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};

person.greet();
```

- In a method, this refers to the object that owns the method (person in the case).

**Example 4: this in an Event Handler**

```js
document.getElementById('myButton').addEventListener('click', function() {
  console.log(this);
});
```

- In an event handler, this refers to the element that triggered the event (the button in this case).

### Difference between passing function with pure name, with () and with arrow
```js
// below onClick will pass function as prop to square, inside square we can call handleClick
<Square onSquareClick={handleClick} />
// below will call function directly when executing this component, what if we have multiple such Square component and each has it's index passing to the function, then how can we fix this
<Square onSquareClick={handleClick(0)} />
// below will solve above problem, arrow function will create unnamed function which we are passing, so we're passing actual function with index in it without calling it. When the square is clicked, the code after the `=>` “arrow” will run, calling `handleClick(0)`
// so when you want to pass plain function without any args then pass it like plain function like step1, when you want to pass function with arguments pass it with arrow function, so that arrow function will behave as wrapper on top of actual function call and doesn't execute it right away !
<Square onSquareClick={() => handleClick(0)} />
```

### Parallel Promises

https://julesblom.com/writing/running-promises-in-parallel

### `export { xxx as default }` vs `export default xxx`

https://webdeveloper.beehiiv.com/p/differences-export-default-xx-export-xx-default

### export as default and named

**Default** export as **Default**:

```javascript
export {default} from './something';
```

**Default** export as **Named**:

```javascript
export {default as foo} from './something';
```

**Named** export as **Default**:

```javascript
export {foo as default} from './something';
```

**Named** export as **Named**:

```javascript
export {foo} from './something';
```

**Named** export as **Renamed**:

```javascript
export {foo as bar} from './something';
```

**All Named** export **as all named**:

```javascript
export * from './something';
```
