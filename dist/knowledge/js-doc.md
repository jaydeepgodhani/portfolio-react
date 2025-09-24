#### Table of contents

1. [Up & Going](#up--going)
    * [Variable Types](#variable-types)
    * [Array](#array)
    * [Function](#function)
    * [Hoisting](#hoisting)
    * [Switch](#switch)
    * [Use Strict](#use-strict)
    * [Function As Value](#function-as-value)
    * [Immediately Invoked Function Expression (IIFE)](#immediately-invoked-function-expression-iife)
    * [Closure](#closure)
    * [Modules](#modules)
    * [This](#this)
    * [Prototypes](#prototypes)
    * [Polyfilling](#polyfilling)
    * [Transpiling](#transpiling)
    * [Non-Javascript](#non-javascript)
2. [Misc](#misc)
3. [Scope & Closure](#scope--closure)
    * [Hiding Variables and Function  ](#hiding-variables-and-function)
    * [Function As Scope  ](#function-as-scope)
    * [Anonymous Versus Named](#anonymous-versus-named)
    * [Let Declaration  ](#let-declaration)
    * [Hoisting](#hoistings)
    * [Closure](#closures)
    * [Singleton Pattern](#singleton-pattern)
    * [Dynamic Scope](#dynamic-scope)
4. [This & Object](#this--object)
5. [Date](#date)


## Up & Going

### Variable Types

```javascript
Number("42") // convert 42 into number type - 42
String(16) // convert 16 into string type - "16"

var amount = 99.5287;
amount.toFixed(2); // "99.52"

var a;
typeof a; // "undefined"

a = "hello world";
typeof a; // "string"

a = 42;
typeof a; // "number"

a = true;
typeof a; // "boolean"

a = null;
typeof a; // "object"--weird, bug

a = undefined;
typeof a; // "undefined"

a = { b: "c" };
typeof a; // "object"
```

### Array

```javascript
var obj = {
	a: "hello world",
	b: 42
};

var b = "a";
obj[b]; // "hello world"
obj["b"]; // 42
```

#### Nullish operator

before running the transpiler

```javascript
height = height ?? 100;
```

after running the transpiler

```javascript
height = (height !== undefined && height !== null) ? height : 100;
let user;
alert(user ?? "Anonymous"); // Anonymous (user is undefined)
```

The important difference between them is that:

`||` returns the first truthy value.
`??` returns the first defined value.

In other words, `||` doesn’t distinguish between false, 0, an empty string "" and null/undefined. They are all the same – falsy values. If any of these is the first argument of ||, then we’ll get the second argument as the result.

```javascript
let height = 0;
alert(height || 100); // 100
alert(height ?? 100); // 0
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
```

shows the first defined value
```javascript
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

modification in place
```javascript
let num = null
console.log(num??=10)
// 10
// If you console.log(num) again, you get 10.
// So the value of num has been modified in place.
let int = 1
console.log(int??=10)
// 1
```

It’s forbidden to use it with || or && without explicit parentheses.

### Function

```javascript
function foo() {
	return 42;
}

foo.bar = "hello world";
typeof foo; // "function"
typeof foo(); // "number"
typeof foo.bar; // "string"
```

all `falsy` values are below

```javascript
"" (empty string)
0, -0, NaN (invalid number)
null, undefined
false
```

but below are `truthy` values

```javascript
[] // truthy
{} // truthy
```


`==` checks for value equality with coercion allowed, and

`===` checks for value equality without allowing coercion(conversion)

If either value (aka side) in a comparison could be the true or false value, avoid == and use `===`

If either value in a comparison could be of these specific values (0, "", or []—empty array), avoid == and use `===`

In all other cases, you’re safe to use `==`. Not only is it safe, but in many cases it simplifies your code in a way that improves readability


```javascript
var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c; // true
b == c; // true
a == b; // false
```

### Hoisting

```javascript
var a = 2;
foo(); // works because `foo()`
// declaration is "hoisted"

function foo() {
	a = 3;
	console.log( a ); // 3
	var a; // declaration is "hoisted"
	// to the top of `foo()`
}

console.log( a ); // 2
```


```javascript
function foo() {
	a = 1; // `a` not formally declared
}

foo();
a; // 1--oops, auto global variable. default a considered as var type, and hoisted at top and that is changed to 1
```

### Switch

```javascript
switch (a) {
case 2:
	// do something
	break;
case 10:
	// do another thing
	break;
case 42:
	// do yet another thing
	break;
default:
	// fallback to here
}
```


fall through

```javascript
switch (a) {
case 2: // if a is either 2 or 10, it execute
case 10: // the "some cool stuff" code
	// some cool stuff
	break;
case 42:
	// other stuff
	break;
default:
	// fallback
}
```


### Use Strict

```javascript
function foo() {
	"use strict";
	// this code is strict mode
	function bar() {
		// this code is strict mode
	}
}
// this code is not strict mode
```


```javascript
"use strict";
function foo() {
	// this code is strict mode
	function bar() {
		// this code is strict mode
	}
}
// this code is strict mode
```


One key difference (improvement!) with strict mode is disallowing the implicit auto-global variable declaration from omitting the var:

```javascript
function foo() {
	"use strict"; // turn on strict mode
	a = 1; // `var` missing, ReferenceError
}
foo();
```


### Function As Value


Not only can you pass a value (argument) to a function, but a function itself can be a value that’s assigned to variables or passed to or returned from other functions

```javascript
var foo = function() {
	// this function expression is called anonymous
};

var x = function bar(){
	// this function expression is called named (bar)
};

foo();
x();
```


### Immediately Invoked Function Expression (IIFE)

```javascript
(function IIFE(){
	console.log( "Hello!" );
})();
// "Hello!"
```


functions create variable scope, using an IIFE in this fashion is often used to declare variables that won’t affect the surrounding code outside the IIFE

```javascript
var a = 42;
(function IIFE(){
	var a = 10;
	console.log( a ); // 10
})();
console.log( a ); // 42
```


IIFEs can also have return values:

```javascript
var x = (function IIFE(){
	return 42;
})();
x; // 42
```

The primary reason to use an IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by the outside world

### Closure


You can think of closure as a way to `remember` and continue to access a function’s scope (its variables) even once the function has finished running

```javascript
function makeAdder(x) {
// parameter `x` is an inner variable
// inner function `add()` uses `x`, so
// it has a "closure" over it
	function add(y) {
		return y + x;
	};
return add;
}
```

The reference to the inner `add(..)` function that gets returned with each call to the outer `makeAdder(..)` is able to remember whatever x value was passed in to `makeAdder(..)`. Now, let’s use makeAdder(..): `plusOne` gets a reference to the inner `add(..)` function with closure over the `x` parameter of the outer `makeAdder(..)`

```javascript
var plusOne = makeAdder( 1 );
```

`plusTen` gets a reference to the inner `add(..)` function with closure over the `x` parameter of the outer `makeAdder(..)`

```javascript
var plusTen = makeAdder( 10 );
plusOne( 3 ); // 4 <-- 1 + 3
plusOne( 41 ); // 42 <-- 1 + 41
plusTen( 13 ); // 23 <-- 10 + 13
```


More on how this code works:

1. When we call makeAdder(1), we get back a reference to its inner add(..) that remembers x as 1. We call this function reference plusOne(..).
2. When we call makeAdder(10), we get back another reference to its inner add(..) that remembers x as 10. We call this function reference plusTen(..).
3. When we call plusOne(3), it adds 3 (its inner y) to the 1 (remembered by x), and we get 4 as the result.
4. When we call plusTen(13), it adds 13 (its inner y) to the 10 (remembered by x), and we get 23 as the result. Don’t worry if this seems strange and confusing at first—it can be!

### Modules

The most common usage of closure in JavaScript is the module pattern. Modules let you define private implementation details (variables, functions) that are hidden from the outside world, as well as a public API that is accessible from the outside


```javascript
function User(){
	var username, password;
	function doLogin(user,pw) {
		username = user;
		password = pw;
		// do the rest of the login work
	}
	var publicAPI = {
		login: doLogin
	};

return publicAPI;

}
// create a `User` module instance
var fred = User();
// it's a function call that's why only User() instead of new user()
fred.login( "fred", "12Battery34!" );
```


The `User()` function serves as an outer scope that holds the variables username and password, as well as the inner `doLogin()` function; these are all private inner details of this User module that cannot be accessed from the outside world

The inner `doLogin()` function has a closure over username and pass word, meaning it will retain its access to them even after the `User()` function finishes running


### This

If a function has a this reference inside it, that this reference usually points to an object. But which object it points to depends on how the function was called.
It’s important to realise that this does not refer to the function itself, as is the most common misconception

```javascript
function foo() {
	console.log( this.bar );
}

var bar = "global";

var obj1 = {
	bar: "obj1",
	foo: foo
};

var obj2 = {
	bar: "obj2"
};

// --------

foo(); // "global"
obj1.foo(); // "obj1"
foo.call( obj2 ); // "obj2"
new foo(); // undefined
```

1. foo() ends up setting this to the global object in non-strict mode. in strict mode, this would be undefined and you’d get an error in accessing the bar property—so `global` is the value found for this.bar.
2. obj1.foo() sets this to the obj1 object.
3. foo.call(obj2) sets this to the obj2 object.
4. new foo() sets this to a brand new empty object

### Prototypes

When you reference a property on an object, if that property doesn’t exist, JavaScript will automatically use that object’s internal prototype reference to find another object to look for the property on. You could think of this almost as a fallback if the property is missing.
The internal prototype reference linkage from one object to its fallback happens at the time the object is created.

```javascript
var foo = {
	a: 42
};

// create `bar` and link it to `foo`

var bar = Object.create( foo );

bar.b = "hello world";
bar.b; // "hello world"
bar.a; // 42 <-- delegated to `foo`
```

The a property doesn’t actually exist on the bar object, but because bar is prototype-linked to foo, JavaScript automatically falls back to looking for a on the foo object, where it’s found

### Polyfilling

The word `polyfill` is used to refer to taking the definition of a newer feature and producing a piece of code that’s equivalent to the behaviour, but is able to run in older JS environments
Number.isNaN is defined in ES6 only, so older browser can polyfill that utility like below

```javascript
if (!Number.isNaN) {
	Number.isNaN = function isNaN(x) {
		return x !== x;
	};
}
```


### Transpiling

Babel - Transpiles ES6+ into ES5
Traceur - Transpiles ES6, ES7, and beyond into ES5

There’s no way to polyfill new syntax that has been added to the language. The new syntax would throw an error in the old JS engine as unrecognized/invalid

So the better option is to use a tool that converts your newer code into older code equivalents. This process is commonly called `transpiling`, a term for `transforming + compiling`

default parameter value example

```javascript
function foo(a = 2) {
	console.log( a );
}
foo(); // 2
foo( 42 ); // 42

// transpiled code below

function foo() {
	var a = arguments[0] !== (void 0) ? arguments[0] : 2;
	console.log( a );
}
```


### Non-Javascript


```javascript
var el = document.getElementByID( "foo" );
```

The document variable exists as a global variable when your code is running in a browser. It’s not provided by the JS engine, nor is it particularly controlled by the JavaScript specification. It takes the form of something that looks an awful lot like a normal JS object, but it’s not really exactly that. It’s a special object, often called a `host object`.

Moreover, the `getElementByID(..)` method on document looks like a normal JS function, but it’s just a thinly exposed interface to a built-in method provided by the DOM from your browser. In some (newer-generation) browsers, this layer may also be in JS, but traditionally the DOM and its behavior is implemented in something more like C/C++

same goes with `alert()` and `console.log()`.

------
## Misc
------

1. The Ternary Operator:

	Use Case: Conditional Assignment

```javascript
let isAdmin;
if (user.role === 'admin') {
	isAdmin = true;
} else {
	isAdmin = false;
}

// Shorthand:

const isAdmin = user.role === 'admin' ? true : false;

// Shorterhand:

const isAdmin = user.role === 'admin';
```

2. Object Property Shorthand:

	Use Case: Creating Objects with Variables

```javascript
const name = 'Leandro';
const age = 30;
const person = {
	name: name,
	age: age
};

// Shorthand:

const name = 'Leandro';
const age = 30;
const person = {
	name,
	age
};
```

3. Default Parameter Values:

	Use Case: Providing Default Values to Function Parameters
```javascript
function greet(name) {
name = name || 'Guest';
return `Hello, ${name}!`;
}

// Shorthand:

function greet(name = 'Guest') {
return `Hello, ${name}!`;
}

```

4. Short-Circuit Evaluation:

	Use Case: Fallback for `Undefined` or `Null` Values
```javascript
const username = getUsernameFromAPI();
const displayName = username ? username : 'Anonymous';

// Shorthand:

const username = getUsernameFromAPI();
const displayName = username || 'Anonymous';
```

5. Array Destructuring:

	Use Case: Swapping Variables
```javascript
let a = 5;
let b = 10;
const temp = a;
a = b;
b = temp;

// Shorthand:

let a = 5;
let b = 10;
[a, b] = [b, a];
```

6. Template Literals:

	Use Case: Dynamic String Concatenation
```javascript
const name = 'Leandro';
const greeting = 'Hello, ' + name + '!';

// Shorthand:

const name = 'Leandro';
const greeting = `Hello, ${name}!`;
```

7. Arrow Functions:

	Use Case: Concise Function Definitions
```javascript
function add(a, b) {
	return a + b;
}

// Shorthand:

const add = (a, b) => a + b;
```

8. Nullish Coalescing Operator:

	Use Case: Providing Default Values for `Null` or `Undefined` Variables
```javascript
const fetchUserData = () => {
	return 'leandro' // change to null or undefined to see the behavior
};
const data = fetchUserData();
const username = data !== null && data !== undefined ? data : 'Guest';

// Shorthand:

const fetchUserData = () => {
	return 'leandro' // change to null or undefined to see the behavior
};
const data = fetchUserData();
const username = data ?? 'Guest';
```

9. Object Destructuring:

	Use Case: Extracting Object Properties into Variables
```javascript
const user = {
	name: 'Leandro',
	age: 30,
	country: 'USA'
};
const name = user.name;
const age = user.age;
const country = user.country;

// Shorthand:

const user = {
	name: 'Leandro',
	age: 30,
	country: 'USA'
};
const { name, age, country } = user;
```

10. Spread Operator:

	Use Case: Merging Arrays or Objects
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = arr1.concat(arr2);

// Shorthand:

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArray = [...arr1, ...arr2];
```

11. Logical OR Assignment:

	Use Case: Assigning a Default Value to a Variable
```javascript
let count;
if (!count) {
	count = 0;
}

// Shorthand:

let count;
count ||= 0;
```

12. Short-Circuit Evaluation for Function Call:

	Use Case: Avoiding Unnecessary Function Execution
```javascript
function fetchData() {
	if (shouldFetchData) {
		return fetchDataFromAPI();
	} else {
		return null;
	}
}

// Shorthand:

function fetchData() {
	return shouldFetchData && fetchDataFromAPI();
}
```

13. String Object vs Primitive

```javascript
const primitiveString = 'Hello, World!'; // primitive string
const objectString = new String('Hello, World!'); // string object

console.log(typeof primitiveString); // Output: string
console.log(typeof objectString);    // Output: object
```
Convert string object to literal
```javascript
const objectString = new String('Hello, World!');
const primitiveString = objectString.valueOf();

console.log(typeof primitiveString); // Output: string
```

14. Generating Strings with Specific Characters
```javascript
const specialString = String.fromCharCode(9829, 9786, 8482);
console.log(specialString); // Output: ♥☺™
```
Dynamic string creation
```javascript
const unicodeValues = [72, 105, 33];
const dynamicString = String.fromCharCode(...unicodeValues);
console.log(dynamicString); // Output: Hi!
```


------
## Scope & Closure
------

Global variables are automatically also properties of the global object (window in browsers, etc.), so it is possible to reference a global variable not directly by its lexical name, but instead indirectly as a property reference of the global object.

`window.a`

This technique gives access to a global variable that would otherwise be inaccessible due to it being `shadowed`. However, non-global shadowed variables cannot be accessed

eval cheating
```javascript
function foo(str, a) {
	eval( str ); // cheating!
	console.log( a, b );
}
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3

function foo(str) {
	"use strict";
	eval( str );
	console.log( a ); // ReferenceError: a is not defined
}
foo( "var a = 2" );
```

with cheating

```javascript
var obj = {
	a: 1,
	b: 2,
	c: 3
};

more "tedious" to repeat "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

"easier" short-hand
with (obj) {
	a = 3;
	b = 4;
	c = 5;
}
```

```javascript
function foo(obj) {
	with (obj) {
		a = 2;
	}
}

var o1 = {
	a: 3
};

var o2 = {
	b: 3
};

foo( o1 );
console.log( o1.a ); // 2
foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2—Oops, leaked global!
```

The with statement takes an object, one that has zero or more properties, and treats that object as if it is a wholly separate lexical scope, and thus the object’s properties are treated as lexically defined identi‐ fiers in that scope

In addition to being a bad idea to use, both `eval(..)` and with are affected (restricted) by Strict Mode. with is outright disallowed, whereas various forms of indirect or unsafe `eval(..)` are disallowed while retaining the core functionality

Your code will almost certainly tend to run slower simply by the fact that you include an `eval(..)` or with anywhere in the code. No matter how smart the engine may be about trying to limit the side-effects of these pessmistic assumptions, there’s no getting around the fact that without the optimizations, code runs slower.

Lexical scope means that scope is defined by author-time decisions of where functions are declared. The lexing phase of compilation is essentially able to know where and how all identifiers are declared, and thus predict how they will be looked up during execution.

Two mechanisms in JavaScript can "cheat" lexical scope: `eval(..)` and `with`. The former can modify existing lexical scope (at runtime) by evaluating a string of "code" that has one or more declarations in it. The latter essentially creates a whole new lexical scope (again, at runtime) by treating an object reference as a scope and that object’s properties as scoped identifiers

### Hiding Variables and Function

bad design
```javascript
function doSomething(a) {
	b = a + doSomethingElse( a * 2 );
	console.log( b * 3 );
}
function doSomethingElse(a) {
	return a - 1;
}
var b;
doSomething( 2 ); // 15
```

better design
```javascript
function doSomething(a) {
	function doSomethingElse(a) {
		return a - 1;
	}
	var b;
	b = a + doSomethingElse( a * 2 );
	console.log( b * 3 );
}
doSomething( 2 ); // 15
```

### Function As Scope

we can take any snippet of code and wrap a function around it, and that effectively `hides` any enclosed variable or function declarations from the outside scope inside that function’s inner scope.
```javascript
var a = 2;
function foo() { // <-- insert this
	var a = 3;
	console.log( a ); // 3
} // <-- and this
foo(); // <-- and this
console.log( a ); // 2
```
problems of this approach

the first is that we have to declare a named-function `foo()`, which means that the identifier name foo itself `pollutes` the enclosing scope (global, in this case). We also have to explicitly call the function by name `(foo())` so that the wrapped code actually executes

solution
```javascript
var a = 2;
(function foo(){ // <-- insert this
	var a = 3;
	console.log( a ); // 3
})(); // <-- and this
console.log( a ); // 2
```
In other words, `(function foo(){ .. })` as an expression means the identifier foo is found only in the scope where the .. indicates, not in the outer scope. Hiding the name foo inside itself means it does not pollute the enclosing scope unnecessarily.

### Anonymous Versus Named

```javascript
setTimeout( function(){
	console.log("I waited 1 second!");
}, 1000 );
```

This is called an anonymous function expression, because function() ... has no name identifier on it. Function expressions can be anonymous, but function declarations cannot omit the name—that would be illegal JS grammar.

Anonymous functions have no useful name to display in stack traces, which can make debugging more difficult

If function is the very first thing in the statement, then it’s a function declaration. Otherwise, it’s a function expression.

The best practice is to always name your function expressions:

```javascript
setTimeout( function timeoutHandler(){ // <-- Look, I have a name
	console.log( "I waited 1 second!" );
}, 1000 );
```

common IIFE call

```javascript
var a = 2;
(function IIFE( global ){
	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2
})( window );

// same approach
var a = 2;
(function IIFE( def ){
	def( window );
	})(function def( global ){
		var a = 3;
		console.log( a ); // 3
		console.log( global.a ); // 2
});
```

linter safe code guideline

While this behavior has been specified and true of practically all standard JS environments (except perhaps old IE), many linters seem to still complain if you have two or more catch clauses in the same scope that each declare their error variable with the same identifier name. This is not actually a redefinition, since the variables are safely block-scoped, but the linters still seem to, annoyingly, complain about this fact.

To avoid these unnecessary warnings, some devs will name their catch variables err1, err2, etc. Other devs will simply turn off the linting check for duplicate variable names

### Let Declaration

declarations made with let will not hoist to the entire scope of the block they appear in. Such declarations will not observably `exist` in the block until the declaration statement
```javascript
{
console.log( bar ); // ReferenceError!
let bar = 2;
}
```

```javascript
function process(data) {
// do something interesting
}
// anything declared inside this block can go away after!
{ // without this enclosing braces somereallybigdata would stored in memory till whole file processed
	let someReallyBigData = { .. };
	process( someReallyBigData );
}
var btn = document.getElementById( "my_button" );
btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );

let loops

for (let i=0; i<10; i++) {
	console.log( i );
}
console.log( i ); // ReferenceError
```
Not only does let in the for loop header bind the `i` to the for loop body, but in fact, it rebinds it to each iteration of the loop, making sure to reassign it the value from the end of the previous loop iteration
```javascript
{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}
```

### Hoistings
```javascript
a = 2;
var a;
console.log( a ); // ans is 2

------
console.log( a ); // ans is undefined
var a = 2;
```

all declarations, both variables and functions, are processed first, before any part of your code is executed

When you see `var a = 2`, you probably think of that as one statement. But JavaScript actually thinks of it as two statements: `var a;` and `a = 2;`. The first statement, the declaration, is processed during the compilation phase. The second statement, the assignment, is left in place for the execution phase

It’s also important to note that hoisting is per-scope.

Function declarations are hoisted, as we just saw. But function expressions are not

```javascript
foo(); // not ReferenceError, but TypeError!
// foo() is attempting to invoke the undefined value, which is a TypeError
var foo = function bar() {
	...
};

------
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
	...
};
```

This snippet is more accurately interpreted (with hoisting) as

```javascript
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
var bar = ...self...
	...
}
```

functions are hoisted first, and then variables

```javascript
foo(); // 1
var foo;
function foo() {
	console.log( 1 );
}

foo = function() {
	console.log( 2 );
};
```

`1` is printed instead of `2`. This snippet is interpreted by the Engine as

```javascript
function foo() {
	console.log( 1 );
}

foo(); // 1
foo = function() {
	console.log( 2 );
}
```

Notice that var foo was the duplicate (and thus ignored) declaration, even though it came before the `function foo()...` declaration, because function declarations are hoisted before normal variables

subsequent function declarations do override previous ones

```javascript
foo(); // 3
function foo() {
	console.log( 1 );
}
var foo = function() {
	console.log( 2 );
};
function foo() {
	console.log( 3 );
}
```

### Closures

Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope

```javascript
function foo() {
	var a = 2;
	function bar() {
		console.log( a ); // 2
	}
	bar();
}
foo();

------

function foo() {
	var a = 2;
	function bar() {
		console.log( a );
	}
	return bar;
}
var baz = foo();
baz(); // 2 -- Whoa, closure was just observed, man
```

By virtue of where it was declared, `bar()` has a lexical scope closure over that inner scope of `foo()`, which keeps that scope alive for `bar()` to reference at any later time. `bar()` still has a reference to that scope, and that reference is called closure

```javascript
function foo() {
	var a = 2;
	function baz() {
		console.log( a ); // 2
	}
	bar( baz );
}
function bar(fn) {
	fn(); // look ma, I saw closure!
} // another example of closure

------

function wait(message) {
	setTimeout( function timer(){
		console.log( message );
	}, 1000 );
}
wait( "Hello, closure!" );
```

We take an inner function (named timer) and pass it to `setTimeout(..)`. But timer has a scope closure over the scope of `wait(..)`, indeed keeping and using a reference to the variable message

```javascript
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
} // 6, 6, 6, 6, 6
```

The IIFE creates scope by declaring a function and immediately executing it

```javascript
for (var i=1; i<=5; i++) {
	(function(){
		setTimeout( function timer(){
			console.log( i );
		}, i*1000 );
	})();
} // this still won't work
```

It’s not enough to have a scope to close over if that scope is empty. Look closely. Our IIFE is just an empty do-nothing scope. It needs something in it to be useful to us

```javascript
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log(j);
		}, j*1000 );
	})();
}

// or this

for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
```

It essentially turns a block into a scope that we can close over. So, the following awesome code just works

```javascript
for (var i=1; i<=5; i++) {
	let j = i; // yay, block-scope for closure!
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}
```

special behavior defined for let declarations used in the head of a for loop. This behavior says that the variable will be declared not just once for the loop, but each iteration. And, it will, helpfully, be initialized at each subsequent iteration with the value from the end of the previous iteration

```javascript
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```
### Function

#### call bind apply

```javascript
// caching
function slow(x) {
	// there can be a heavy CPU-intensive job here
	alert(`Called with ${x}`);
	return x;
}
function cachingDecorator(func) {
	let cache = new Map();
	return function(x) {
		if (cache.has(x)) { // if there's such key in cache
			return cache.get(x); // read the result from it
		}
		let result = func(x); // otherwise call func
		cache.set(x, result); // and cache (remember) the result
		return result;
	};
}
slow = cachingDecorator(slow);
alert( slow(1) ); // slow(1) is cached and the result returned
alert( "Again: " + slow(1) ); // slow(1) result returned from cache
alert( slow(2) ); // slow(2) is cached and the result returned
alert( "Again: " + slow(2) ); // slow(2) result returned from cache
```

cachingDecorator is a decorator: a special function that takes another function and alters its behavior.

The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper. That’s great, because we can have many functions that could use such a feature, and all we need to do is to apply cachingDecorator to them.

By separating caching from the main function code we also keep the main code simpler.

The result of `cachingDecorator(func)` is a "wrapper": function(x) that "wraps" the call of func(x) into caching logic

There’s a special built-in function method `func.call(context, ...args)` that allows to call a function explicitly setting `this`.

As an example, in the code below we call sayHi in the context of different objects: `sayHi.call(user)` runs sayHi providing `this=user`, and the next line sets `this=admin`

```javascript
function sayHi() {
	alert(this.name);
}
let user = { name: "John" };
let admin = { name: "Admin" };
// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
function say(phrase) {
	alert(this.name + ': ' + phrase);
}
let user = { name: "John" };
```

user becomes `this`, and "Hello" becomes the first argument

```javascript
say.call( user, "Hello" ); // John: Hello
let worker = {
	someMethod() {
		return 1;
	},
	slow(x) {
		alert("Called with " + x);
		return x * this.someMethod(); // (*)
	}
};
function cachingDecorator(func) {
	let cache = new Map();
	return function(x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
	let result = func.call(this, x); // "this" is passed correctly now
	cache.set(x, result);
	return result;
	};
}
worker.slow = cachingDecorator(worker.slow); // now make it caching
alert( worker.slow(2) ); // works
alert( worker.slow(2) ); // works, doesn't call the original (cached)
```

To make it all clear, let’s see more deeply how this is passed along:
1. After the decoration worker.slow is now the wrapper function (x) { ... }.
2. So when `worker.slow(2)` is executed, the wrapper gets 2 as an argument and `this=worker` (it’s the object before dot).
3. Inside the wrapper, assuming the result is not yet cached, `func.call(this, x)` passes the current this (=worker) and the current argument (=2) to the original method.

```javascript
let worker = {
	slow(min, max) {
		alert(`Called with ${min},${max}`);
		return min + max;
	}
};
function cachingDecorator(func, hash) {
	let cache = new Map();
	return function() {
		let key = hash(arguments); // (*)
		if (cache.has(key)) {
			return cache.get(key);
		}
		let result = func.call(this, ...arguments); // (**)
		cache.set(key, result);
		return result;
	};
}
function hash(args) {
	return args[0] + ',' + args[1];
}
worker.slow = cachingDecorator(worker.slow, hash);
alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
```

The only syntax difference between call and apply is that call expects a list of arguments, while apply takes an array-like object with them

```javascript
func.call(context, ...args);
func.apply(context, args);
```

for objects that are both iterable and array-like, such as a real array, we can use any of them, but apply will probably be faster, because most JavaScript engines internally optimize it better

Passing all arguments along with the context to another function is called call forwarding

```javascript
let wrapper = function() {
return func.apply(this, arguments);
};
```

#### Borrowing a method

```javascript
function hash() {
alert( [].join.call(arguments) ); // 1,2
}
hash(1, 2);
```

We take (borrow) a join method from a regular array `([].join)` and use `[].join.call` to run it in the context of arguments

#### function binding

```javascript
let user = {
	firstName: "John",
	sayHi() {
		alert(`Hello, ${this.firstName}!`);
	}
};
setTimeout(user.sayHi, 1000); // Hello, undefined!
```

That’s because setTimeout got the function `user.sayHi`, separately from the object. Once a method is passed somewhere separately from the object – `this` is lost.

The simplest solution is to use a wrapping function:

```javascript
let user = {
	firstName: "John",
	sayHi() {
		alert(`Hello, ${this.firstName}!`);
	}
};
setTimeout(function() {
	user.sayHi(); // Hello, John!
}, 1000);

setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

problem with this approach is what if value changes in between
```javascript
let user = {
	firstName: "John",
	sayHi() {
		alert(`Hello, ${this.firstName}!`);
	}
};
setTimeout(() => user.sayHi(), 1000);
// ...the value of user changes within 1 second
user = {
sayHi() { alert("Another user in setTimeout!"); }
};
```

Another user in setTimeout!

Functions provide a built-in method bind that allows to fix this.

```javascript
let user = {
firstName: "John"
};
function func() {
alert(this.firstName);
}
let funcUser = func.bind(user);
funcUser(); // John
```

with argument

```javascript
let user = {
firstName: "John"
};
function func(phrase) {
alert(phrase + ', ' + this.firstName);
}
// bind this to user
let funcUser = func.bind(user);
funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)
```

value doesn't change here

```javascript
let user = {
firstName: "John",
sayHi() {
alert(`Hello, ${this.firstName}!`);
}
};
let sayHi = user.sayHi.bind(user); // (*)
```

can run it without an object

```javascript
sayHi(); // Hello, John!
setTimeout(sayHi, 1000); // Hello, John!
```

even if the value of user changes within 1 second

`sayHi` uses the pre-bound value which is reference to the old user object

```javascript
user = {
	sayHi() { alert("Another user in setTimeout!"); }
};
```

#### partial function

```javascript
function mul(a, b) {
return a * b;
}
let double = mul.bind(null, 2);
alert( double(3) ); // = mul(2, 3) = 6
```

The call to `mul.bind(null, 2)` creates a new function double that passes calls to mul, fixing null as the context and 2 as the first argument. Further arguments are passed "as is"

That’s called partial function application – we create a new function by fixing some parameters of the existing one.

Please note that we actually don’t use this here. But bind requires it, so we must put in something like null

The benefit is that we can create an independent function with a readable name (double, triple). We can use it and not provide the first argument every time as it’s fixed with bind

For instance, we have a function `send(from, to, text)`. Then, inside a user object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

#### Module Pattern

```javascript
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];
	function doSomething() {
		console.log( something );
	}
	function doAnother() {
		console.log( another.join( " ! " ) );
	}
	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

This is the pattern in JavaScript we call module. The most common way of implementing the module pattern is often called revealing module, and it’s the variation we present here.

Without the execution of the outer function, the creation of the inner scope and the closures would not occur

#### Singleton Pattern

```javascript
var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];
	function doSomething() {
		console.log( something );
	}

function doAnother() {
	console.log( another.join( " ! " ) );
}

return {
	doSomething: doSomething,
	doAnother: doAnother
};
})();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
  ```

we turned our module function into an IIFE, and we immediately invoked it and assigned its return value directly to our single module instance identifier `foo `

Modules are just functions, so they can receive parameters

```javascript
function CoolModule(id) {
	function identify() {
		console.log( id );
	}

	return {
		identify: identify
	};
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );
foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"

------

var foo = (function CoolModule(id) {
	function change() {
	// modifying the public API
	publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};
	return publicAPI;

})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

#### Dynamic Scope

```javascript
function foo() {
	console.log( a );
}

function bar() {
	var a = 3;
	foo();
}
var a = 2;
bar();
```

JavaScript does not, in fact, have dynamic scope. It has lexical scope. Plain and simple. But the this mechanism is kind of like dynamic scope.

The key contrast: lexical scope is write-time, whereas dynamic scope (and this!) are runtime. Lexical scope cares where a function was declared, but dynamic scope cares where a function was called from.

Finally, this cares how a function was called, which shows how closely related the this mechanism is to the idea of dynamic scoping.

------
## This & Object
------

this does not, in any way, refer to a function’s lexical scope. It is true that internally, scope is kind of like an object with properties for each of the available identifiers. But the scope `object` is not accessible to JavaScript code. It’s an inner part of the engine’s implementation

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
foo(); // 2
```

```javascript
function foo() {
	"use strict";
	console.log( this.a );
}
var a = 2;
foo(); // TypeError: `this` is `undefined`
```

```javascript
function foo() {
	console.log( this.a );
}
var obj2 = {
	a: 42,
	foo: foo
};
var obj1 = {
	a: 2,
	obj2: obj2
};
obj1.obj2.foo(); // 42
```

```javascript
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var bar = obj.foo; // function reference/alias!
var a = "oops, global"; // `a` also property on global object
bar(); // "oops, global"
```

the call-site is what matters, and the call-site is `bar()`, which is a plain, undecorated call, and thus the default binding applies

```javascript
function foo() {
	console.log( this.a );
}
function doFoo(fn) {
	// `fn` is just another reference to `foo`
	fn(); // <-- call-site!
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // `a` also property on global object
doFoo( obj.foo ); // "oops, global"
```

What if the function you’re passing your callback to is not your own, but built into the language? No difference, same outcome

```javascript
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // `a` also property on global object
setTimeout( obj.foo, 100 ); // "oops, global"
```

The most typical way to wrap a function with a hard binding creates a pass-through of any arguments passed and any return value received

```javascript
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = function() {
	return foo.apply( obj, arguments );
};
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Since hard binding is such a common pattern, it’s provided with a built- in utility as of ES5, Function.prototype.bind, and it’s used like this

```javascript
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a: 2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

`bind(..)` returns a new function that is hardcoded to call the original function with the this context set as you specified

```javascript
function foo(el) {
	console.log( el, this.id );
}
var obj = {
	id: "awesome"
};
// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

So, pretty much any ol’ function, including the built-in object functions like `Number(..)` can be called with new in front of it, and that makes that function call a constructor call. This is an important but subtle distinction: there’s really no such thing as "constructor functions," but rather construction calls of functions. When a function is invoked with new in front of it, otherwise known as a constructor call, the following things are done automatically

1. A brand new object is created (aka constructed) out of thin air.
2. The newly constructed object is `[[Prototype]]-` linked.
3. The newly constructed object is set as the this binding for that function call.
4. Unless the function returns its own alternate object, the new- invoked function call will automatically return the newly constructed object.

```javascript
function foo(a) {
	this.a = a;
}
var bar = new foo( 2 );
console.log( bar.a ); // 2
```

By calling `foo(..)` with new in front of it, we’ve constructed a new object and set that new object as the this for the call of `foo(..)`. So new is the final way that a function call’s this can be bound. We’ll call this new binding

```javascript
function foo() {
	console.log( this.a );
}
var obj1 = {
	a: 2,
	foo: foo
};
var obj2 = {
	a: 3,
	foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

explicit binding takes precedence over implicit binding

```javascript
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

new binding is more precedent than implicit binding

hard binding (which is a form of explicit binding) is more precedent than new binding, and thus cannot be overridden with new

```javascript
function foo(something) {
	this.a = something;
}
var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

```javascript
function foo(p1,p2) {
	this.val = p1 + p2;
}
// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );
var baz = new bar( "p2" );
baz.val; // p1p2
```

Determining `this`

Now, we can summarize the rules for determining `this` from a function call's call-site, in their order of precedence. Ask these questions in this order, and stop when the first rule applies.

1. Is the function called with new (new binding)? If so, this is the newly constructed object.
	`var bar = new foo()`
2. Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.
	`var bar = foo.call( obj2 )`
3. Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.
	`var bar = obj1.foo()`
4. Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise pick the global object.
	`var bar = foo()`

If you pass null or undefined as a this binding parameter to call, apply, or bind, those values are effectively ignored, and instead the default binding rule applies to the invocation

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}
// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3
// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

Both these utilities require a this binding for the first parameter. If the functions in question don’t care about this, you need a placeholder value, and null might seem like a reasonable choice

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2
```

arow function with this

```javascript
function foo() {
	return (a) => {
		// `this` here is lexically inherited from `foo()`
		console.log( this.a );
	};
}
var obj1 = {
	a: 2
};
var obj2 = {
	a: 3
};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```

The arrow-function created in `foo()` lexically captures whatever `foo()`s this is at its call-time. Since foo() was this-bound to `obj1`, bar (a reference to the returned arrow-function) will also be this- bound to `obj1`. The lexical binding of an arrow-function cannot be overridden (even with new!)

### OBJECTS

Objects come in two forms: the declarative (literal) form and the constructed form

The literal syntax for an object looks like this: (Preferred)

```javascript
var myObj = {
	key: value
	// ...
};
```

The constructed form looks like this: (NOT-Recommended)

```javascript
var myObj = new Object();
myObj.key = value;
```

simple primitives (string, boolean, number, null, and undefined) are not themselves objects. In fact, null is its own primitive type

function is a subtype of object (technically, a "callable object"). Functions in JS are said to be "first class" in that they are basically just normal objects (with callable behavior semantics bolted on), and so they can be handled like any other plain object

```javascript
var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false
var strObject = new String( "I am a string" );
```

String, Number, Boolean, Object, Function, Array, Date, RegExp, Error are just a built-in functions that can be used as a constructor with the result being a newly constructed object of the subtype in question

```javascript
typeof strObject; // "object"
strObject instanceof String; // true
```

inspect the object sub-type
`Object.prototype.toString.call( strObject ); // [object String]`

The primitive value "I am a string" is not an object, it’s a primitive literal and immutable value. To perform operations on it, such as checking its length, accessing its individual character contents, etc., a String object is required

```javascript
var strPrimitive = "I am a string";
console.log( strPrimitive.length ); // 13
console.log( strPrimitive.charAt( 3 ) ); // "m"
```

In both cases, we call a property or method on a string primitive, and the engine automatically coerces it to a String object, so that the property/method access works

`null` and `undefined` have no object wrapper form, only their primitive values. By contrast, Date values can only be created with their constructed object form, as they have no literal form counterpart

Objects, Arrays, Functions, and RegExps (regular expressions) are all objects regardless of whether the literal or constructed form is used. The constructed form does offer, in some cases, more options in creation than the literal form counterpart. Since objects are created either way, the simpler literal form is almost universally preferred. Only use the constructed form if you need the extra options.

Error objects are rarely created explicitly in code, but usually created automatically when exceptions are thrown. They can be created with the constructed form `new Error(..)`, but it’s often unnecessary

```javascript
var myObject = {
	a: 2
};
myObject.a; // 2 , called as property access
myObject["a"]; // 2, called as key access
```

property name must be String, otherwise it'll convert to the string

```javascript
var myObject = { };
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";
myObject["true"]; // "foo"
myObject["3"]; // "bar"
myObject["[object Object]"]; // "baz"
```

Arrays are objects, so even though each index is a positive integer, you can also add properties onto the array

```javascript
var myArray = [ "foo", 42, "bar" ];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```

Notice that adding named properties (regardless of `.` or `[ ]` operator syntax) does not change the reported length of the array

if you try to add a property to an array, but the property name looks like a number, it will end up instead as a numeric index (thus modifying the array contents)

```javascript
var myArray = [ "foo", 42, "bar" ];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"
```

#### Object Copy

```javascript
function anotherFunction() { /*..*/ }
var anotherObject = {
	c: true
};
var anotherArray = [];
var myObject = {
	a: 2,
	b: anotherObject, // reference, not a copy!
	c: anotherArray, // another reference!
	d: anotherFunction
};
anotherArray.push( anotherObject, myObject );
```

What exactly should be the representation of a copy of myObject

First, we should answer if it should be a shallow or deep copy? A shallow copy would end up with a on the new object as a copy of the value 2, but the b, c, and d properties as just references to the same places as the references in the original object. A deep copy would duplicate not only `myObject`, but `anotherObject` and `anotherArray`. But then we have the issue that `anotherArray` has references to `anotherObject` and `myObject` in it, so those should also be duplicated rather than reference-preserved. Now we have an infinite circular duplication problem because of the circular reference

for JSON-safe objects, copying object looks like below code

```javascript
var newObj = JSON.parse( JSON.stringify( someObj ) );
```

Shallow copy using assign

```javascript
var newObj = Object.assign( {}, myObject );
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

### Property Descriptors

```javascript
var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );

// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }
```

As you can see, the property descriptor (called a "data descriptor" since it’s only for holding a data value) for our normal object property a is much more than just its value of 2. It includes three other characteristics: writable, enumerable, and configurable.

While we can see what the default values for the property descriptor characteristics are when we create a normal property, we can use `Object.defineProperty(..)` to add a new property, or modify an existing one (if it’s configurable!), with the desired characteristics.

```javascript
var myObject = {};
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );
myObject.a; // 2
```

The ability for you to change the value of a property is controlled by writable.

```javascript
var myObject = {};
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );
myObject.a = 3;
myObject.a; // 2
```

our modification of the value silently failed. But in strict mode, above will fail as `TypeError`

As long as a property is currently configurable, we can modify its descriptor definition, using the same `defineProperty(..)` utility

```javascript
var myObject = {
	a: 2
};
myObject.a = 3;
myObject.a; // 3
Object.defineProperty( myObject, "a", {
	value: 4,
	writable: true,
	configurable: false, // not configurable!
	enumerable: true
} );
myObject.a; // 4
myObject.a = 5;
myObject.a; // 5
Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // always gives TypeError
```

changing configurable to false is a one-way action, and cannot be undone

even if the property is already `configurable:false`, writable can always be changed from true to false without error, but not back to true if already false

Another thing configurable:false prevents is the ability to use the delete operator to remove an existing property

```javascript
var myObject = {
	a: 2
};
myObject.a; // 2
delete myObject.a;
myObject.a; // undefined
Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: false,
	enumerable: true
} );
myObject.a; // 2
delete myObject.a; // silently failed
myObject.a; // 2
```

### Enumerable

this characteristic controls whether a property will show up in certain object-property enumerations, such as the for..in loop. Set enumerable to false to keep the property from showing up in such enumerations, even though it’s still completely accessible. Set it to true to include the property in enumerations

### Immutability

#### Object constant

By combining `writable:false` and `configurable:false`, you can essentially create a constant (cannot be changed, redefined, or deleted) as an object property

```javascript
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
});
```

#### Prevent extensions

If you want to prevent an object from having new properties added to it, but otherwise leave the rest of the object’s properties alone, call `Object.preventExtensions(..)`

```javascript
var myObject = {
	a: 2
};
Object.preventExtensions( myObject );
myObject.b = 3;
myObject.b; // undefined , silently failed but will give TypeError in strict
```

#### Seal

`Object.seal(..)` creates a "sealed" object, which means it takes an existing object and essentially calls `Object.preventExtensions(..)` on it, but also marks all its existing properties as `configurable:false`.

So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you can still modify their values)

#### Freeze

It's nothing but `Object.seal(..) + writable:false`

This approach is the highest level of immutability that you can attain for an object itself, as it prevents any changes to the object or to any of its direct properties (though, as mentioned earlier, the contents of any referenced other objects are unaffected)

### Getter & Setter

```javascript
var myObject = {
// define a getter for `a`
	get a() {
		return 2;
	}
};
myObject.a = 3;
myObject.a; // 2

var myObject = {
	get a() {
		return this._a_; // nothing special about _a_
	},
	set a(val) {
		this._a_ = val * 2;
	}
};
myObject.a = 2;
myObject.a; // 4
```

#### Existence of Property in Object

```javascript
var myObject = {
	a: 2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```

The in operator will check to see if the property is in the object, or if it exists at any higher level of the `[[Prototype]]` chain object traversal. By contrast, `hasOwnProperty(..)` checks to see if only myObject has the property or not, and will not consult the `[[Prototype]]` chain

use `for..in` loops only on objects, and traditional for loops with numeric index iteration for arrays

```javascript
var myObject = { };
Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);
Object.defineProperty(
	myObject,
	"b",
	// make `b` nonenumerable
	{ enumerable: false, value: 3 }
);
myObject.propertyIsEnumerable( "a" ); // true
myObject.propertyIsEnumerable( "b" ); // false
Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]
```

`propertyIsEnumerable(..)` tests whether the given property name exists directly on the object and is also `enumerable:true`.

`Object.keys(..)` returns an array of all enumerable properties, whereas `Object.getOwnPropertyNames(..)` returns an array of all properties, enumerable or not

```javascript
var myArray = [ 1, 2, 3 ];
	for (var v of myArray) {
	console.log( v );
}
// 1
// 2
// 3
```

------
## CLASS
------

### Constructor

```javascript
class CoolGuy {
	specialTrick = nothing
	CoolGuy( trick ) {
	specialTrick = trick
	}
	showOff() {
		output( "Here's my trick: ", specialTrick )
	}
}
Joe = new CoolGuy( "jumping rope" )
Joe.showOff() // Here's my trick: jumping rope
```

### Inheritance

```javascript
class Vehicle {
	engines = 1
	ignition() {
		output( "Turning on my engine." );
	}
	drive() {
		ignition();
		output( "Steering and moving forward!" )
	}
}
class Car inherits Vehicle {
	wheels = 4
	drive() {
		inherited:drive()
		output( "Rolling on all ", wheels, " wheels!" )
	}
}
class SpeedBoat inherits Vehicle {
	engines = 2
	ignition() {
		output( "Turning on my ", engines, " engines." )
	}
	pilot() {
		inherited:drive()
		output( "Speeding through the water with ease!" )
	}
}
```

------
## PROTOTYPES
------

we have a user object with its properties and methods, and want to make admin and guest as slightly modified variants of it. We’d like to reuse what we have in user, not copy/reimplement its methods, just build a new object on top of it. Prototypal inheritance is a language feature that helps in that

In JavaScript, objects have a special hidden property `[[Prototype]]` (as named in the specification), that is either null or references another object. That object is called "a prototype"

When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called "prototypal inheritance".

Many ways to access it. One of them is to use the special name `__proto__`

```javascript
let animal = {
	eats: true
};
let rabbit = {
	jumps: true
};
rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
```

Now if we read a property from rabbit, and it’s missing, JavaScript will automatically take it from animal.

```javascript
let animal = {
	eats: true
};
let rabbit = {
	jumps: true
};
rabbit.__proto__ = animal; //

//we can find both properties in rabbit now:
alert( rabbit.eats ); // true
alert( rabbit.jumps ); // true
```

The prototype chain can be longer as well

```javascript
let animal = {
	eats: true,
	walk() {
		alert("Animal walk");
	}
};
let rabbit = {
	jumps: true,
	__proto__: animal
};
```

walk is taken from the prototype

`rabbit.walk(); // Animal walk`

There are only two limitations:

1. The references can’t go in circles. JavaScript will throw an error if we try to assign `__proto__` in a circle.
2. The value of `__proto__` can be either an object or null. Other types are ignored.

Also it may be obvious, but still: there can be only one `[[Prototype]]`. An object may not inherit from two others

Please note that `__proto__` is not the same as the internal `[[Prototype]]` property. It’s a getter/setter for `[[Prototype]]`. Later we’ll see situations where it matters, for now let’s just keep it in mind, as we build our understanding of JavaScript language.

The `__proto__` property is a bit outdated. It exists for historical reasons, modern JavaScript suggests that we should use `Object.getPrototypeOf/Object.setPrototypeOf` functions instead that get/set the prototype. We’ll also cover these functions later.

By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we’re quite safe using it.

The prototype is only used for reading properties.

Write/delete operations work directly with the object

```javascript
let animal = {
	eats: true,
	walk() {
	/* this method won't be used by rabbit */
	}
};
let rabbit = {
	__proto__: animal
};
rabbit.walk = function() {
	alert("Rabbit! Bounce-bounce!");
};
rabbit.walk(); // Rabbit! Bounce-bounce!
```

From now on, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype

Accessor properties are an exception, as assignment is handled by a setter function. So writing to such a property is actually the same as calling a function

```javascript
let user = {
	name: "John",
	surname: "Smith",
	set fullName(value) {
		[this.name, this.surname] = value.split(" ");
	},
	get fullName() {
		return `${this.name} ${this.surname}`;
	}
};

let admin = {
	__proto__: user,
	isAdmin: true
};

alert(admin.fullName); // John Smith

// setter triggers!
admin.fullName = "Alice Cooper";
alert(admin.fullName); // Alice Cooper, state of admin modified
alert(user.fullName); // John Smith, state of user protected
```

No matter where the method is found: in an object or its prototype. In a method call, this is always the object before the dot.

```javascript
// animal has methods
let animal = {
	walk() {
		if (!this.isSleeping) {
			alert(`I walk`);
		}
	},
	sleep() {
		this.isSleeping = true;
	}
};

let rabbit = {
	name: "White Rabbit",
	__proto__: animal
};

modifies rabbit.isSleeping

rabbit.sleep();
alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The `for..in` loop iterates over inherited properties too.

```javascript
let animal = {
	eats: true
};
let rabbit = {
	jumps: true,
	__proto__: animal
};
```

`Object.keys` only returns own keys
`alert(Object.keys(rabbit)); // jumps`

for..in loops over both own and inherited keys

`for(let prop in rabbit) alert(prop); // jumps, then eats`

If that’s not what we want, and we’d like to exclude inherited properties, there’s a built-in method `obj.hasOwnProperty(key)` it returns true if obj has its own (not inherited) property named key

```javascript
for(let prop in rabbit) {
	let isOwn = rabbit.hasOwnProperty(prop);
	if (isOwn) {
		alert(`Our: ${prop}`); // Our: jumps
	} else {
		alert(`Inherited: ${prop}`); // Inherited: eats
	}
}
```

there’s one funny thing. Where is the method `rabbit.hasOwnProperty` coming from? We did not define it. Looking at the chain we can see that the method is provided by `Object.prototype.hasOwnProperty`. In other words, it’s inherited.

But why does hasOwnProperty not appear in the for..in loop like eats and jumps do, if for..in lists inherited properties?

The answer is simple: it’s not enumerable. Just like all other properties of `Object.prototype`, it has `enumerable:false` flag. And for..in only lists enumerable properties. That’s why it and the rest of the `Object.prototype` properties are not listed

------
## Types & Grammer
------

```javascript
var a;
a; // undefined
b; // ReferenceError: b is not defined
```

An annoying confusion is the error message that browsers assign to this condition. As you can see, the message is "b is not defined,"which is of course very easy and reasonable to confuse with "b is undefined."Yet again, "undefined"and "is not defined"are very different things. It’d be nice if the browsers said something like "b is not found"or "b is not declared"to reduce the confusion

```javascript
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```

The typeof operator returns "undefined" even for "undeclared" (or "not defined") variable

observe that all global variables are also properties of the global object, which in the browser is basically the window object

the safety guard (preventing an error) on `typeof` when used against an undeclared variable can be helpful in certain cases

```javascript
function doSomethingCool() {
	var helper =
	(typeof FeatureXYZ !== "undefined") ? FeatureXYZ : function() { /*.. default feature ..*/ };
	var val = helper();
// ..
}
```

Other developers would prefer a design pattern called `dependency injection`, where instead of `doSomethingCool()` inspecting implicitly for `FeatureXYZ` to be defined outside/around it, it would need to have the dependency explicitly passed in

```javascript
function doSomethingCool(FeatureXYZ) {
	var helper = FeatureXYZ ||
	function() { /*.. default feature ..*/ };
	var val = helper();
	// ...
}
```

Be careful about creating "sparse" arrays (leaving or creating empty/missing slots)

```javascript
var a = [ ];
a[0] = 1;
```

no `a[1]` slot set here

```javascript
a[2] = [ 3 ];
a[1]; // undefined
a.length; // 3
```

arrays are numerically indexed (as you'd expect), but the tricky thing is that they also are objects that can have string keys/properties added to them (but which don’t count toward the length of the array)

```javascript
var a = [ ];
a[0] = 1;
a["foobar"] = 2;
a.length; // 1
a["foobar"]; // 2
a.foobar; // 2
```

but...

```javascript
var a = [ ];
a["13"] = 42;
a.length; // 14
```

```javascript
let fruits = ["Apple", "Orange", "Pear"];
alert( fruits.shift() ); // remove Apple and alert it
alert( fruits ); // Orange, Pear
let fruits = ["Orange", "Pear"];
fruits.unshift('Apple');
alert( fruits ); // Apple, Orange, Pear
let fruits = ["Apple"];
fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");
// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
// reverse a string
var c = a
// split `a` into an array of characters
.split( "" )
// reverse the array of characters
.reverse()
// join the array of characters back to a string
.join( "" );
c; // "oof"
```

exponential number

```javascript
var a = 5E10;
a; // 50000000000
a.toExponential(); // "5e+10"
var b = a * a;
b; // 2.5e+21
var c = 1 / a;
c; // 2e-11

var onethousand = 1E3; // means 1 * 10^3
var onemilliononehundredthousand = 1.1E6; // means 1.1 * 10^6
```

fixed to right side

```javascript
var a = 42.59;
a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

hexa octal number

```javascript
0xf3; // hexadecimal for: 243
0Xf3; // ditto
0363; // octal for: 243
0o363; // octal for: 243
0O363; // ditto
0b11110011; // binary for: 243
0B11110011; // ditto
```

comparing two floating point numbers with epsilon range

```javascript
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}
```

```javascript
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); // true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5
alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
alert( parseInt('a123') ); // NaN, the first symbol stops the process
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");
alert( a + b );
```

#### Generators

```javascript
function* generateSequence() {
	yield 1;
	yield 2;
	return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
let one = generator.next();
alert(JSON.stringify(one)); // {value: 1, done: false}
let two = generator.next();
alert(JSON.stringify(two)); // {value: 2, done: false}
let three = generator.next();
alert(JSON.stringify(three)); // {value: 3, done: true}
for(let value of generator) {
	alert(value); // 1, then 2 (not 3 - for that it should be yield 3;)
}
let sequence = [0, ...generateSequence()];
alert(sequence); // 0, 1, 2, 3
```

there’s a special yield* syntax to "embed" (compose) one generator into another

```javascript
function* generateSequence(start, end) {
	for (let i = start; i <= end; i++) yield i;
}
function* generatePasswordCodes() {
	// 0..9
	yield* generateSequence(48, 57);
	// A..Z
	yield* generateSequence(65, 90);
	// a..z
	yield* generateSequence(97, 122);
}
let str = '';
for(let code of generatePasswordCodes()) {
	str += String.fromCharCode(code);
}
alert(str); // 0..9A..Za..z
```

yield is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.

```javascript
function* gen() {
	// Pass a question to the outer code and wait for an answer
	let result = yield "2 + 2 = ?"; // (*)
	alert(result);
}
let generator = gen();
let question = generator.next().value; // <-- yield returns the value
generator.next(4); // --> pass the result into the generator
```

The maximum floating-point value that can be represented is roughly `1.798e+308` (which is really, really, really huge!), predefined for you as `Number.MAX_VALUE`. On the small end, `Number.MIN_VALUE` is roughly `5e-324`, which isn’t negative but is really close to zero!

reference mistake

```javascript
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]
	// later
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}
var a = [1,2,3];
foo( a );
a; // [1,2,3,4] not [4,5,6,7]
```

answer for that

```javascript
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]
	// later
	x.length = 0; // empty existing array in-place
	x.push( 4, 5, 6, 7 );
	x; // [4,5,6,7]
}
var a = [1,2,3];
foo( a );
a; // [4,5,6,7] not [1,2,3,4]
```

#### Strings

```javascript
function sum(a, b) {
	return a + b;
}
alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

```javascript
let guestList = `Guests:
	* John
	* Pete
	* Mary
`;
alert(guestList); // a list of guests, multiple lines
```

```javascript
let str = `Hello`;
// the first character
alert( str[0] ); // H
alert( str.at(0) ); // H
// the last character
alert( str[str.length - 1] ); // o
alert( str.at(-1) );
for (let char of "Hello") {
	alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

slice (recommended)

```javascript
let str = "stringify";
alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
```

```javascript
// substring
let str = "stringify";
// these are same for substring
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"
// ...but not for slice:
alert( str.slice(2, 6) ); // "ring" (the same)
alert( str.slice(6, 2) ); // "" (an empty string)
```

compare

```javascript
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

default parameter

```javascript
function foo( a = 42, b = a + 1 ) {
	console.log(arguments.length, a, b, arguments[0], arguments[1]);
}
foo(); // 0 42 43 undefined undefined
foo( 10 ); // 1 10 11 10 undefined
foo( 10, undefined ); // 2 10 11 10 undefined
foo( 10, null ); // 2 10 null 10 null
```

#### Try Catch exception

try...catch works synchronously

```javascript
try {
	setTimeout(function() {
		noSuchVariable; // script will die here
	}, 1000);
} catch (err) {
	alert( "won't work" );
}
```

If an exception happens in "scheduled" code, like in setTimeout, then try...catch won’t catch it:
That's because the function itself is executed later, when the engine has already left the try...catch construct.

```javascript
try {
	lalala; // error, variable is not defined!
} catch (err) {
	alert(err.name); // ReferenceError
	alert(err.message); // lalala is not defined
	alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)
}
```

JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others

```javascript
let error = new Error(message);
let error = new SyntaxError(message);
let error = new ReferenceError(message);
```

For built-in errors (not for any objects, just for errors), the name property is exactly the name of the constructor. And message is taken from the argument.

```javascript
let error = new Error("Things happen o_O");
alert(error.name); // Error
alert(error.message); // Things happen o_O
try {
	user = { /*...*/ };
} catch (err) {
	if (err instanceof ReferenceError) {
		alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
	}
}
```

The finally clause works for any exit from try...catch. That includes an explicit return

```javascript
function func() {
	try {
		return 1;
	} catch (err) {
	/* ... */
	} finally {
	alert( 'finally' );
	}
}
alert( func() ); // first works alert from finally, and then this one
```

### destructring

```javascript
let arr = ["John", "Smith"]
let [firstName, surname] = arr;
alert(firstName); // John
alert(surname); // Smith

let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname); // Smith
```

second element is not needed

```javascript
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert( title ); // Consul
```

we can use it with any iterable, not only arrays

```javascript
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```

```javascript
let user = {};
[user.name, user.surname] = "John Smith".split(' ');
alert(user.name); // John
alert(user.surname); // Smith
let user = {
name: "John",
age: 30
};
```

loop over keys-and-values

```javascript
for (let [key, value] of Object.entries(user)) {
	alert(`${key}:${value}`); // name:John, then age:30
}

let user = new Map();
user.set("name", "John");
user.set("age", "30");
```

Map iterates as [key, value] pairs, very convenient for destructuring

```javascript
for (let [key, value] of user) {
	alert(`${key}:${value}`); // name:John, then age:30
}
let guest = "Jane";
let admin = "Pete";
```

Let's swap the values: make guest=Pete, admin=Jane

```javascript
[guest, admin] = [admin, guest];
alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

```javascript
let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
let [firstName, surname] = [];
alert(firstName); // undefined
alert(surname); // undefined
```

default values

```javascript
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name); // Julius (from array)
alert(surname); // Anonymous (default used)
```

Default values can be more complex expressions or even function calls. They are evaluated only if the value is not provided

```javascript
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
alert(name); // Julius (from array)
alert(surname); // whatever prompt gets
```

The destructuring assignment also works with objects.

```javascript
let {var1, var2} = {var1:…, var2:…}
let options = {
	title: "Menu",
	width: 100,
	height: 200
};
let {title, width, height} = options;
alert(title); // Menu
alert(width); // 100
alert(height); // 200
```

The order does not matter. This works too
```javascript
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
let options = {
	title: "Menu",
	width: 100,
	height: 200
};
// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
// width -> w
// height -> h
// title -> title
alert(title); // Menu
alert(w); // 100
alert(h); // 200
```

```javascript
let options = {
	title: "Menu"
};
let {width = 100, height = 200, title} = options;
alert(title); // Menu
alert(width); // 100
alert(height); // 200
```

only extract title as a variable

```javascript
let { title } = options;
alert(title); // Menu
let options = {
	title: "Menu",
	height: 200,
	width: 100
};
// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;
// now title="Menu", rest={height: 200, width: 100}
alert(rest.height); // 200
alert(rest.width); // 100
let title, width, height;
// error in this line because JS think it's a code block
{title, width, height} = {title: "Menu", width: 200, height: 100};
let title, width, height;
// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});
alert( title ); // Menu
```

when function has many parameters, we've to remember order of the parameters and default value, destruct comes to the rescue

```javascript
let options = {
	title: "My menu",
	items: ["Item1", "Item2"]
};
// ...and it immediately expands it to variables
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
	alert( `${title} ${width} ${height}` ); // My Menu 200 100
	alert( items ); // Item1, Item2
}
showMenu(options);
showMenu({}); // ok, all values are default
showMenu(); // this would give an error
```

We can fix above error by making {} the default value for the whole object of parameters

```javascript
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
alert( `${title} ${width} ${height}` );
}
showMenu(); // Menu 100 200
```

time difference

```javascript
let start = Date.now(); // milliseconds count from 1 Jan 1970
// do the job
for (let i = 0; i < 100000; i++) {
let doSomething = i * i * i;
}
let end = Date.now(); // done
alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

### arrow function

```javascript
let func = (arg1, arg2, ..., argN) => expression;
// equals to
let func = function(arg1, arg2, ..., argN) {
	return expression;
};
```

```javascript
let sum = (a, b) => a + b;
/* This arrow function is a shorter form of:
let sum = function(a, b) {
	return a + b;
};
*/
alert( sum(1, 2) ); // 3
let double = n => n * 2;
```

roughly the same as: `let double = function(n) { return n * 2 }`

```javascript
alert( double(3) ); // 6
let sayHi = () => alert("Hello!");
sayHi();
let age = prompt("What is your age?", 18);
let welcome = (age < 18) ? () => alert('Hello!') : () => alert("Greetings!");
welcome();
let sum = (a, b) => { // the curly brace opens a multiline function
	let result = a + b;
	return result; // if we use curly braces, then we need an explicit "return"
};
alert( sum(1, 2) ); // 3
```

arrow functions do not have this. If this is accessed, it is taken from the outside.

```javascript
let group = {
	title: "Our Group",
	students: ["John", "Pete", "Alice"],
	showList() {
			this.students.forEach(
			student => alert(this.title + ': ' + student)
		);
	}
};
group.showList();
```

Here in forEach, the arrow function is used, so this.title in it is exactly the same as in the outer method showList. That is: group.title.

If we used a "regular" function, there would be an error:

```javascript
let group = {
	title: "Our Group",
	students: ["John", "Pete", "Alice"],
	showList() {
		this.students.forEach(function(student) {
		// Error: Cannot read property 'title' of undefined
		alert(this.title + ': ' + student);
		});
	}
};
group.showList();
```

The arrow => doesn’t create any binding. The function simply doesn’t have this. The lookup of this is made exactly the same way as a regular variable search: in the outer lexical environment.
1. Do not have this
2. Do not have arguments variable
3. Can't be called with new

##### Access arguments in regular vs arrow function

You can access all the arguments passed to a regular function using the `arguments` object. The `arguments` object is an array-like object that holds all the arguments passed to the function
```javascript
function logNumbers(num1, num2) {
  console.log(arguments)
}

logNumbers(8, 24) // 8 , 24
```
argument object is not available in arrow function, instead you have to do this
```javascript
const logNumbers = (...args) => {
  console.log(args)
}

logNumbers(8, 24) // [8, 24]
```

##### Duplicate named parameters
When a regular function has duplicate names in the parameters, the last parameter with the duplicate name will take precedence, But in "strict mode", using a duplicate named parameter will result in a syntax error
```javascript
function exampleFunction(a, b, a) {
  console.log(a, b)
}

exampleFunction("first", "second", "third")
```
Arrow functions don't allow for the same parameter name to be used more than once in the parameter list. Doing so will result in a syntax error
```javascript
const exampleFunction = (a, b, a) => {
  console.log(a, b)
}

exampleFunction("first", "second", "third")
```
##### Function Hoisting
Regular functions are hoisted to the top. And you can access and call them even before they are declared.
```javascript
regularFunction()

function regularFunction() {
  console.log("This is a regular function.")
}
```
Arrow functions, on the other hand, cannot be accessed before they are initialised
```javascript
arrowFunction()

const arrowFunction = () => {
  console.log("This is an arrow function.")
}
```
##### this binding
```javascript
const myObject = {
  regularExample: function() {
    console.log("REGULAR: ", this)
  },

  arrowExample: () => {
    console.log("ARROW: ", this)
  }
}

myObject.regularExample() // myobject
myObject.arrowExample() // window object
```

It's recommended to use regular function in any of the following cases:

- when you need to use a constructor with the `new` keyword
- when you need the `this` binding to be dynamically scoped
- when you want to use the `arguments` object

And you can use arrow functions in any of the following cases:

- when you want a more concise syntax for the function
- when you need to maintain the lexical scope of `this`
- for non-method functions (in most cases)

### Promise

```javascript
let promise = new Promise(function(resolve, reject) {
	// executor (the producing code, "singer")
});
```

The executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls resolve if it was successful or reject if there was an error
The promise object returned by the new Promise constructor has these internal properties:

1. state — initially `pending`, then changes to either `fulfilled` when resolve is called or `rejected` when reject is called.
2. result — initially undefined, then changes to value when `resolve(value)` is called or error when `reject(error)` is called.

Here’s an example of a promise constructor and a simple executor function with "producing code" that takes time (via setTimeout)

```javascript
let promise = new Promise(function(resolve, reject) {
	// the function is executed automatically when the promise is constructed
	// after 1 second signal that the job is done with the result "done"
	setTimeout(() => resolve("done"), 1000);
});
```

We can see two things by running the code above:

1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: resolve and reject. These functions are pre-defined by the JavaScript engine, so we don’t need to create them. We should only call one of them when ready.

```javascript
let promise = new Promise(function(resolve, reject) {
	// after 1 second signal that the job is finished with an error
	setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

The call to `reject(...)` moves the promise object to `rejected` state:
A promise that is either resolved or rejected is called `settled`, as opposed to an initially `pending` promise.
The executor should call only one resolve or one reject. Any state change is final.
The idea is that a job done by the executor may have only one result or an error.
Also, resolve/reject expect only one argument (or none) and will ignore additional arguments.

The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that. They are described below.

The properties state and result of the Promise object are internal. We can’t directly access them. We can use the methods .then/.catch/.finally for that.

```javascript
let promise = new Promise(function(resolve, reject) {
setTimeout(() => resolve("done!"), 1000);
});
```

resolve runs the first function in .then

```javascript
promise.then(
result => alert(result), // shows "done!" after 1 second
error => alert(error) // doesn't run
);
new Promise((resolve, reject) => {
/* do something that takes time, and then call resolve or maybe reject */
})
// runs when the promise is settled, doesn't matter successfully or not
.finally(() => stop loading indicator) // finally has no argument. In finally we don’t know whether the promise is successful or not. That’s all right
// so the loading indicator is always stopped before we go on
.then(result => show result, err => show error)
```

1. A finally handler doesn’t get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
2. If a finally handler returns something, it’s ignored.
3. When finally throws an error, then the execution goes to the nearest error handler

```javascript
function loadScript(src) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement('script');
		script.src = src;
		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`Script load error for ${src}`));
		document.head.append(script);
	});
}
```

usage ..

```javascript
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
promise.then(
	script => alert(`${script.src} is loaded!`),
	error => alert(`Error: ${error.message}`)
);
promise.then(script => alert('Another handler...'));
```

Promise Chaining

```javascript
new Promise(function(resolve, reject) {
	setTimeout(() => resolve(1), 1000); // (*)
}).then(function(result) { // (**)
	alert(result); // 1
	return result * 2;
}).then(function(result) { // (***)
	alert(result); // 2
	return result * 2;
}).then(function(result) {
	alert(result); // 4
	return result * 2;
});
```

The whole thing works, because every call to a .then returns a new promise, so that we can call the next .then on it

technically we can also add many .then to a single promise. This is not chaining.

wait between each output

```javascript
new Promise(function(resolve, reject) {
	setTimeout(() => resolve(1), 1000);
	}).then(function(result) {
		alert(result); // 1
		return new Promise((resolve, reject) => { // (*)
			setTimeout(() => resolve(result * 2), 1000);
	});
}).then(function(result) { // (**)
	alert(result); // 2
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(result * 2), 1000);
	});
}).then(function(result) {
	alert(result); // 4
});
```

fetch the content

```javascript
fetch('/article/promise-chaining/user.json')
// .then below runs when the remote server responds
.then(function(response) {
	// response.text() returns a new promise that resolves with the full response text
	// when it loads
	return response.text();
})
.then(function(text) {
	// ...and here's the content of the remote file
	alert(text); // {"name": "iliakan", "isAdmin": true}
});
```

This makes a network request to the url and returns a promise. The promise resolves with a response object when the remote server responds with headers, but before the full response is downloaded.

To read the full response, we should call the method response.text(): it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.

same as above, but `response.json()` parses the remote content as JSON

```javascript
fetch('/article/promise-chaining/user.json')
.then(response => response.json())
.then(user => alert(user.name)); // iliakan, got user name
```

reusable code with above exmaple

```javascript
function loadJson(url) {
	return fetch(url)
	.then(response => response.json());
}
function loadGithubUser(name) {
	return loadJson(`https://api.github.com/users/${name}`);
}
function showAvatar(githubUser) {
	return new Promise(function(resolve, reject) {
		let img = document.createElement('img');
		img.src = githubUser.avatar_url;
		img.className = "promise-avatar-example";
		document.body.append(img);
		setTimeout(() => {
			img.remove();
			resolve(githubUser);
		}, 3000);
	});
}
```

Use them:

```javascript
loadJson('/article/promise-chaining/user.json')
.then(user => loadGithubUser(user.name))
.then(showAvatar)
.then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

...

promise error handling

The code of a promise executor and promise handlers has an "invisible try..catch" around it. If an exception happens, it gets caught and treated as a rejection

```javascript
new Promise((resolve, reject) => {
	throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
```

is same as below code

```javascript
new Promise((resolve, reject) => {
	reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
```

The "invisible try..catch" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we throw inside a .then handler, that means a rejected promise, so the control jumps to the nearest error handler.

```javascript
new Promise((resolve, reject) => {
	resolve("ok");
}).then((result) => {
	throw new Error("Whoops!"); // rejects the promise , blabla(); this also throws error
}).catch(alert); // Error: Whoops!
```

If we throw inside .catch, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

the execution: catch -> then

```javascript
new Promise((resolve, reject) => {
	throw new Error("Whoops!");
}).catch(function(error) {
	alert("The error is handled, continue normally");
}).then(() => alert("Next successful handler runs"));
```

In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets "stuck". There’s no code to handle it.

In the browser we can catch such errors using the event `unhandledrejection`

```javascript
window.addEventListener('unhandledrejection', function(event) {
	// the event object has two special properties:
	alert(event.promise); // [object Promise] - the promise that generated the error
	alert(event.reason); // Error: Whoops! - the unhandled error object
});
new Promise(function() {
	throw new Error("Whoops!");
}); // no catch to handle the error
```

### Promise API

There are 6 static methods in the Promise class. We’ll quickly cover their use cases here.

#### Promise.all

Let’s say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.

That’s what `Promise.all` is for

Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result

```javascript
Promise.all([
	new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
	new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
	new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it’s still first in the array of results.

```javascript
let urls = [
	'https://api.github.com/users/iliakan',
	'https://api.github.com/users/remy',
	'https://api.github.com/users/jeresig'
];
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));
// Promise.all waits until all jobs are resolved
Promise.all(requests)
.then(responses => responses.forEach(
	response => alert(`${response.url}: ${response.status}`)
));
```

A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):

```javascript
let names = ['iliakan', 'remy', 'jeresig'];
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));
Promise.all(requests)
.then(responses => {
	// all responses are resolved successfully
	for(let response of responses) {
		alert(`${response.url}: ${response.status}`); // shows 200 for every url
	}
	return responses;
})
```

map array of responses into an array of `response.json()` to read their content

```javascript
.then(responses => Promise.all(responses.map(r => r.json())))
```

all JSON answers are parsed: "users" is the array of them

```javascript
.then(users => users.forEach(user => alert(user.name)));
```

If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

```javascript
Promise.all([
	new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
	new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

if there are multiple fetch calls, like in the example above, and one fails, the others will still continue to execute, but Promise.all won’t watch them anymore. They will probably settle, but their results will be ignored.

```javascript
Promise.all([
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(1), 1000)
	}),
	2,
	3
]).then(alert); // 1, 2, 3
```

#### Promise.allSettled

`Promise.all` rejects as a whole if any promise rejects. That’s good for "all or nothing" cases, when we need all results successful to proceed:

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

`{status:"fulfilled", value:result}` for successful responses,

`{status:"rejected", reason:error}` for errors.

```javascript
let urls = [
	'https://api.github.com/users/iliakan',
	'https://api.github.com/users/remy',
	'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
.then(results => { // (*)
	results.forEach((result, num) => {
	if (result.status == "fulfilled") {
		alert(`${urls[num]}: ${result.value.status}`);
	}
	if (result.status == "rejected") {
		alert(`${urls[num]}: ${result.reason}`);
	}
	});
});
```

result of above code

```javascript
[
{status: 'fulfilled', value: ...response...},
{status: 'fulfilled', value: ...response...},
{status: 'rejected', reason: ...error object...}
]
```

So for each promise we get its status and value/error.

Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

#### Promise.race

```javascript
Promise.race([
new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.

#### Promise.any

Similar to Promise.race, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with `AggregateError` – a special error object that stores all promise errors in its errors property.

```javascript
Promise.any([
	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
	new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
	new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

```javascript
Promise.any([
	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
	console.log(error.constructor.name); // AggregateError
	console.log(error.errors[0]); // Error: Ouch!
	console.log(error.errors[1]); // Error: Error!
});
```

`Promise.resolve(value)` creates a resolved promise with the result value.

```javascript
let promise = new Promise(resolve => resolve(value));
// Promise.reject(error) creates a rejected promise with error.
let promise = new Promise((resolve, reject) => reject(error));
```

Promise handlers .then/.catch/.finally are always asynchronous.

Even when a Promise is immediately resolved, the code on the lines below .then/.catch/.finally will still execute before these handlers

```javascript
let promise = Promise.resolve();
promise.then(() => alert("promise done!"));
alert("code finished"); // this alert shows first
```


Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue PromiseJobs, more often referred to as the "microtask queue" (V8 term)
1. The queue is first-in-first-out: tasks enqueued first are run first.
2. Execution of a task is initiated only when nothing else is running.

to maintain order, do as follow

```javascript
Promise.resolve()
.then(() => alert("promise done!"))
.then(() => alert("code finished"));
```

An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue

```javascript
let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));
```

doesn't run: error handled

```javascript
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

But if we forget to add .catch, then, after the microtask queue is empty, the engine triggers the event:
```javascript
let promise = Promise.reject(new Error("Promise Failed!"));
```

Promise Failed!

```javascript
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

What if we handle the error later
```javascript
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')), 1000);
```

Error: Promise Failed!
```javascript
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

if we run it, we’ll see Promise Failed! first and then caught.

that unhandledrejection is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the “rejected” state, then the event triggers

### Async / Await

The word `async` before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically

```javascript
async function f() {
return 1;
}
f().then(alert); // 1
```

We could explicitly return a promise, which would be the same

```javascript
async function f() {
return Promise.resolve(1);
}
f().then(alert); // 1
```

with await

```javascript
async function f() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("done!"), 1000)
	});
	let result = await promise; // wait until the promise resolves (*)
	alert(result); // "done!"
}
f();
```

async/await with normal function

```javascript
async function wait() {
	await new Promise(resolve => setTimeout(resolve, 1000));
	return 10;
}
function f() {
	// shows 10 after 1 second
	wait().then(result => alert(result));
}
f();
```

### Currying

```javascript
function curry(func) {
	return function curried(...args) {
		if (args.length >= func.length) {
			return func.apply(this, args);
		} else {
			return function(...args2) { return curried.apply(this, args.concat(args2)); }
		}
	};
}
```

usage

```javascript
function sum(a, b, c) {
	return a + b + c;
}
let curriedSum = curry(sum);
alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

Global object

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. It’s supported in all major browsers

```javascript
var gVar = 5; // let wont work here
alert(window.gVar); // 5 (became a property of the global object)
```

We should store values in the global object only if they’re truly global for our project. And keep their number at minimum

To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`

The document object is the main “entry point” to the page. We can change or create anything on the page using it.

change the background color to red
```javascript
document.body.style.background = "red";
```

change it back after 1 second
```javascript
setTimeout(() => document.body.style.background = "", 1000);
```

The `Browser Object Model (BOM)` represents additional objects provided by the browser (host environment) for working with everything except the document.

The functions alert/confirm/prompt are also a part of the BOM

```javascript
alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
	location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

searching a node

```html
<div id="elem">
<div id="elem-content">Element</div>
</div>
<script>
	// get the element
	let elem = document.getElementById('elem');
	// make its background red
	elem.style.background = 'red';
</script>
```

If there are multiple elements with the same id, then the behavior of methods that use it is unpredictable, e.g. `document.getElementById` may return any of such elements at random. So please stick to the rule and keep id unique

The method getElementById can be called only on document object. It looks for the given id in the whole document.

Navigation of element - https://javascript.info/basic-dom-node-properties

By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside elem matching the given CSS selector.

```html
<ul>
<li>The</li>
<li>test</li>
</ul>
<ul>
<li>has</li>
<li>passed</li>
</ul>
<script>
	let elements = document.querySelectorAll('ul > li:last-child');
	for (let elem of elements) {
		alert(elem.innerHTML); // "test", "passed"
	}
</script>
```

`elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The tag parameter can also be a star "*" for “any tags”.

`elem.getElementsByClassName(className)` returns elements that have the given CSS class.

`document.getElementsByName(name)` returns elements with the given name attribute, document-wide. Very rarely used.

get all divs in the document
```html
let divs = document.getElementsByTagName('div');
```

className methods
- `elem.classList.add/remove("class")` – adds/removes the class.
- `elem.classList.toggle("class")` – adds the class if it doesn’t exist, otherwise removes it.
- `elem.classList.contains("class")` – checks for the given class, returns `true/false`.

for example, `document.body.classList.add('article');`

for styling of CSS through JS

for multi-word properties camelCase is used
- background-color => elem.style.backgroundColor
- z-index => elem.style.zIndex
- border-left-width => elem.style.borderLeftWidth

`document.body.style.backgroundColor = prompt('background color?', 'green')`
`button.style.MozBorderRadius = '5px';`

#### event

A handler can be set in HTML with an attribute named `on<event>`.
For instance, to assign a `click` handler for an `input`, we can use `onclick`, like here

```markup
<input value="Click me" onclick="alert('Click!')" type="button">
```

We can assign a handler using a DOM property `on<event>`.
For instance, `elem.onclick`

```html
<input id="elem" type="button" value="Click me">
<script>
elem.onclick = function() {
	alert('Thank you');
};
</script>
```

The value of `this` inside a handler is the element. The one which has the handler on it.
In the code below `button` shows its contents using `this.innerHTML`

```html
<button onclick="alert(this.innerHTML)">Click me</button>
```

```javascript
// right
button.onclick = sayThanks;

// wrong
button.onclick = sayThanks();
```

…On the other hand, in the markup we do need the parentheses

```html
<input type="button" id="button" onclick="sayThanks()">
```

to set multiple handler to one event

```javascript
element.removeEventListener(event, handler, [options]);
```

add/remove eventlistener

```javascript
function handler() {
	alert( 'Thanks!' );
}
input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```
Please note – if we don’t store the function in a variable, then we can’t remove it. There’s no way to “read back” handlers assigned by addEventListener.

So `addEventListener` is more universal than `onclick` etc.

When an event happens, the browser creates an _event object_, puts details into it and passes it as an argument to the handler.

```html
<input type="button" value="Click me" id="elem">
<script>
elem.onclick = function(event) {
	// show event type, element and coordinates of the click
	alert(event.type + " at " + event.currentTarget);
	alert("Coordinates: " + event.clientX + ":" + event.clientY);
};
</script>
```

#### bubbling

```html
<style>
body * {
	margin: 10px;
	border: 1px solid blue;
}
</style>

<form onclick="alert('form')">FORM
	<div onclick="alert('div')">DIV
		<p onclick="alert('p')">P</p>
	</div>
</form>
```

A click on the inner `<p>` first runs `onclick`:

1. On that `<p>`.
2. Then on the outer `<div>`.
3. Then on the outer `<form>`.
4. And so on upwards till the `document` object

So if we click on `<p>`, then we’ll see 3 alerts: `p` → `div` → `form`

The process is called “bubbling”, because events “bubble” from the inner element up through parents like a bubble in the water. Almost all events bubble. For instance, a `focus` event does not bubble. There are other examples too.

A handler on a parent element can always get the details about where it actually happened.
**The most deeply nested element that caused the event is called a _target_ element, accessible as `event.target`**

Note the differences from `this` (=`event.currentTarget`):

- `event.target` – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
- `this` – is the “current” element, the one that has a currently running handler on it

#### capturing

```html
<style>
body * {
	margin: 10px;
	border: 1px solid blue;
}
</style>

<form>FORM
	<div>DIV
		<p>P</p>
	</div>
</form>

<script>
for(let elem of document.querySelectorAll('*')) {
	elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
	elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
}
</script>
```

If you click on `<p>`, then the sequence is:

1. `HTML` → `BODY` → `FORM` → `DIV -> P` (capturing phase, the first listener):
2. `P` → `DIV` → `FORM` → `BODY` → `HTML` (bubbling phase, the second listener).

Please note, the `P` shows up twice, because we’ve set two listeners: capturing and bubbling. The target triggers at the end of the first and at the beginning of the second phase

The `event.stopPropagation()` method and its sibling `event.stopImmediatePropagation()` can also be called on the capturing phase. Then not only the futher capturing is stopped, but the bubbling as well.

In other words, normally the event goes first down (“capturing”) and then up (“bubbling”). But if `event.stopPropagation()` is called during the capturing phase, then the event travel stops, no bubbling will occur

#### event delegation

```html
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter> // this custom property can be accessible via event.target.dataset.counter

<script>
document.addEventListener('click', function(event) {
	if (event.target.dataset.counter != undefined) { // if the attribute exists...
		event.target.value++;
	}
});
</script>
```

toggle behaviour

```html
<button data-toggle-id="subscribe-mail"> // this custom property can be accessible via event.target.dataset.toggleid
	Show the subscription form
</button>

<form id="subscribe-mail" hidden>
	Your mail: <input type="email">
</form>

<script>
document.addEventListener('click', function(event) {
	let id = event.target.dataset.toggleId;
	if (!id) return;
	let elem = document.getElementById(id);
	elem.hidden = !elem.hidden;
});
</script>
```

#### Defer

The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built.

```html
<p>...content before script...</p>
<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
<!-- visible immediately -->
<p>...content after script...</p>
```

- Scripts with `defer` never block the page
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event)

```html
<p>...content before scripts...</p>

<script>
document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>
<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed

the `defer` attribute, besides telling the browser "not to block", ensures that the relative order is kept

The `defer` attribute is only for external scripts.

The `async` attribute is somewhat like `defer`. It also makes the script non-blocking.

- The browser doesn’t block on `async` scripts (like `defer`).
- Other scripts don’t wait for `async` scripts, and `async` scripts don’t wait for them.
- `DOMContentLoaded` and async scripts don’t wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - or after an async script (if an async script is short or was in HTTP-cache)

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don’t wait for them, and they don’t wait for anything. A fully independent script that runs when loaded

We can create a script and append it to the document dynamically using JavaScript. The script starts loading as soon as it’s appended to the document `(*)`. Dynamic scripts behave as "async" by default.

### fetch

A typical fetch request consists of two `await` calls
```javascript
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```
Or, without `await`
```javascript
fetch(url, options)
	.then(response => response.json())
	.then(result => /* process result */)
```

Response properties

- `response.status` – HTTP code of the response,
- `response.ok` – `true` if the status is 200-299.
- `response.headers` – Map-like object with HTTP headers.

```javascript
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
```

post request

```javascript
let user = {
	name: 'John',
	surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);
```

The `fetch` method allows to track _download_ progress.
Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

```javascript
// instead of response.json() and other methods
const reader = response.body.getReader();
// infinite loop while the body is downloading
while(true) {
	// done is true for the last chunk
	// value is Uint8Array of the chunk bytes
	const {done, value} = await reader.read();
	if (done) {
		break;
	}
	console.log(`Received ${value.length} bytes`)
}
```

The result of `await reader.read()` call is an object with two properties:

- `done` – `true` when the reading is complete, otherwise `false`.
- `value` – a typed array of bytes: `Uint8Array`.

receive data chunk by chunk and decode it

```javascript
// Step 1: start the fetch and obtain a reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');
const reader = response.body.getReader();

// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
while(true) {
	const {done, value} = await reader.read();
	if (done) {
		break;
	}
	chunks.push(value);
	receivedLength += value.length;
	console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4: concatenate chunks into single Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

abort the fetch

To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here’s the full example with `fetch` aborted after 1 second:

```javascript
// abort in 1 second

let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
	let response = await fetch('/article/fetch-abort/demo/hang', {
		signal: controller.signal
	});
} catch(err) {
	if (err.name == 'AbortError') { // handle abort()
		alert("Aborted!");
	} else {
		throw err;
	}
}
```

`AbortController` is scalable. It allows to cancel multiple fetches at once.

#### URL

```javascript
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

create URL using base URL

```javascript
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

The `URL` object immediately allows us to access its components, so it’s a nice way to parse the url

```javascript
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host); // javascript.info
alert(url.pathname); // /url
```

We can pass `URL` objects to networking (and most other) methods instead of a string

URL with search query

It provides convenient methods for search parameters:

- **`append(name, value)`** – add the parameter by `name`,
- **`delete(name)`** – remove the parameter by `name`,
- **`get(name)`** – get the parameter by `name`,
- **`getAll(name)`** – get all parameters with the same `name` (that’s possible, e.g. `?user=John&user=Pete`),
- **`has(name)`** – check for the existence of the parameter by `name`,
- **`set(name, value)`** – set/replace the parameter,
- **`sort()`** – sort parameters by name, rarely needed,
- …and it’s also iterable, similar to `Map`.

```javascript
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!'); // added parameter with a space and !
alert(url); // https://google.com/search?q=test+me%21
url.searchParams.set('tbs', 'qdr:y'); // added parameter with a colon :

// parameters are automatically encoded
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// iterate over search parameters (decoded)
for(let [name, value] of url.searchParams) {
	alert(`${name}=${value}`); // q=test me!, then tbs=qdr:y
}
```

we can encode string to URI also

```javascript
// using cyrillic characters in url path
let url = encodeURI('http://site.com/привет');
alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

…While for URL parameters we should use `encodeURIComponent` instead

```javascript
let music = encodeURIComponent('Rock&Roll');
let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

So we should use only `encodeURIComponent` for each search parameter, to correctly insert it in the URL string

#### XMLHttpRequest

`XMLHttpRequest` is a built-in browser object that allows to make HTTP requests in JavaScript.
We need something that `fetch` can’t do yet, e.g. to track upload progress, other than that `fetch` is all we need

code for get request

```javascript
let xhr = new XMLHttpRequest();
xhr.open('GET', '/my/url');
xhr.send();

xhr.onload = function() {
	if (xhr.status != 200) { // HTTP error?
		// handle error
		alert( 'Error: ' + xhr.status);
		return;
	}
	// get the response from xhr.response
};

xhr.onprogress = function(event) {
	// report progress
	alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
	// handle non-HTTP error (e.g. network down)
};
```

#### Long Polling

```javascript
async function subscribe() {
	let response = await fetch("/subscribe");

	if (response.status == 502) {
		// Status 502 is a connection timeout error,
		// may happen when the connection was pending for too long,
		// and the remote server or a proxy closed it
		// let's reconnect
		await subscribe();
	} else if (response.status != 200) {
		// An error - let's show it
		showMessage(response.statusText);
		// Reconnect in one second
		await new Promise(resolve => setTimeout(resolve, 1000));
		await subscribe();
	} else {
		// Get and show the message
		let message = await response.text();
		showMessage(message);
		// Call subscribe() again to get the next message
		await subscribe();
	}
}

subscribe();
```

As you can see, `subscribe` function makes a fetch, then waits for the response, handles it and calls itself again

Long polling works great in situations when messages are rare.
If messages come very often, then the chart of requesting-receiving messages, painted above, becomes saw-like.
Every message is a separate request, supplied with headers, authentication overhead, and so on.
So, in this case, another method is preferred, such as [Websocket](https://javascript.info/websocket) or [Server Sent Events](https://javascript.info/server-sent-events).

#### WebSockets

To open a websocket connection, we need to create `new WebSocket` using the special protocol `ws` in the url

```javascript
let socket = new WebSocket("ws://javascript.info");
```
There’s also encrypted `wss://` protocol. It’s like HTTPS for websockets. Always prefer `wss`

Once the socket is created, we should listen to events on it. There are totally 4 events:

- **`open`** – connection established,
- **`message`** – data received,
- **`error`** – websocket error,
- **`close`** – connection closed.

and if we’d like to send something, then `socket.send(data)` will do that

```javascript
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
	alert("[open] Connection established");
	alert("Sending to server");
	socket.send("My name is John");
};

socket.onmessage = function(event) {
	alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
	if (event.wasClean) {
		alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
	} else {
		// e.g. server process killed or network down
		// event.code is usually 1006 in this case
		alert('[close] Connection died');
	}
};

socket.onerror = function(error) {
	alert(`[error]`);
};
```

small server [server.js](https://javascript.info/article/websocket/demo/server.js) written in Node.js, for the example above, running. It responds with “Hello from server, John”, then waits 5 seconds and closes the connection.

So you’ll see events `open` → `message` → `close`

```javascript
const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    message = message.toString();
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
    ws.send(`Hello from server, ${name}!`);

    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
```

Opening a WebSocket

When `new WebSocket(url)` is created, it starts connecting immediately.

During the connection, the browser (using headers) asks the server: “Do you support Websocket?” And if the server replies “yes”, then the talk continues in WebSocket protocol, which is not HTTP at all

Here’s an example of browser headers for a request made by `new WebSocket("wss://javascript.info/chat")`

```text
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

We can’t use `XMLHttpRequest` or `fetch` to make this kind of HTTP-request, because JavaScript is not allowed to set these headers

If the server agrees to switch to WebSocket, it should send code 101 response:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Closing a connection

```javascript
// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
	// event.code === 1000
	// event.reason === "Work complete"
	// event.wasClean === true (clean close)
};
```

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it’s also possible to implement these capabilities manually.

#### Server Sent Events

The [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) specification describes a built-in class `EventSource`, that keeps connection with the server and allows to receive events from it.

Similar to `WebSocket`, the connection is persistent

difference from websockets is
- One-directional: only server sends data
- Only text
- Regular HTTP

- A message text goes after `data:`, the space after the colon is optional.
- Messages are delimited with double line breaks `\n\n`.
- To send a line break `\n`, we can immediately send one more `data:`

```javascript
data: {"user":"John","message":"First line\n Second line"}
```

```javascript
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
	console.log("New message", event.data);
	// will log 3 times for the data stream above
};
```

## Misc / Interview

- `!!` converts anything to its truthy or falsy values.
	Example : `!!-1 gives true`
				`!!null gives false`
				`!![1] gives true`
				`!!0 gives false`

# Date

[medium article about dates](https://medium.com/@titamoto/working-with-dates-in-javascript-eafb208686ee#:~:text=The%20maximum%20timestamp%20in%20JavaScript,in%20a%20value%20of%20NaN%20.)