Node JS uses V8 engine behind the scene with modified JS, which does not have window object but does have fileSystem access, OS level access etc to run it on server. We don't actually need window object as we are not running JS on a browser anymore.

It uses Event Loop and it keep on running till any event is registered, if event is unregistered event loop exits out and node program stops.

Here in below code we registered an event called createServer which keeps on running forever until `process.exit()` is called. process.exit() hard stops the event loop and execution stops there.
```js
const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req);
	process.exit();
})

server.listen(3000); // program runs for the first time, but as soon as we hit localhost:3000 it stops the server with log above
```

