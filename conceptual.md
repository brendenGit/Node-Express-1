### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
- Async functions is a common way to manage async code in JavaScript. Using async and await we can wait for something to complete
  like a request to an API before moving on. Async/await typically uses promises, however, you could also use promises our callback functions to manage async code.

- What is a Promise?
- A promise is an object that has values pending, fulfilled, & rejected. A promise will return one of those values once the
  code it is executing completes.

- What are the differences between an async function and a regular function?
- An async function will wait to finish until the await segment of the code completes. Async functions always return a promise.

- What is the difference between Node.js and Express.js?
- Node is a library for writing server side code in js. Express is a framework built on top of node for builing a server. Express.js is
  a web application framework whereas node is a runtime environment used on the command line.

- What is the error-first callback pattern?
- The error-first callback pattern looks for an error at the beginning of the route. If we find an error we throw a `new Express Error`
  to stop the route from executing further code and send it on to an error function. The first param is reserved for the `err` object

- What is middleware?
- Middleware are instructions for your code is support layered in the middle of your node application to perform specific tasks.
  We create middleware to keep our routes clean.

- What does the `next` function do?
- The `next` function literally does what is up next in the servers code. The `next` function tells the route
  to move onto the `next` process in the server. For example if we hit an error we would tell the server to leave that route
  and go onto the `next` relevant function likely the error handler.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
- This could be more easily accomplished by using Promise.all and awaiting that on a list of calls. If we make these requests using the 
  `Promise.all()` method we allow for improved performance making all requests concurrently rather than waiting for one to complete. 

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
