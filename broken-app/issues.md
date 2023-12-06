# Broken App Issues
- Server was being run from app.js
- moved server to server.js for more easy testing

- No error handling in app.js
- Added error handler for 404 and generic error handling on server

- Error handling within post route was broken. Previously was not passing err object to next(err) for error handling.
- Added `catch (err) { next(err) }` for proper error handling

- Errors/efficiencies with post request to `https://api.github.com/users/${developer}`
- Moved requets to a `Promise.all()` method for quicker download. Moved helper functions to middleware.js. 
- Added proper returning of json data of developer data.

