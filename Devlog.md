# Day 1

## Concepts Learned

### Express Application
- `express()` returns an application object.
- The application object manages the entire server.

Why it matters:
This is the entry point of the backend.

---

### Route Matching
- Express checks routes from top to bottom.
- The first matching route handles the request.

Why it matters:
Route order affects application behavior.

---

### Middleware
- Middleware executes before controllers.
- It can authenticate users, log requests, or modify `req`.

Why it matters:
Keeps business logic clean and reusable.

---

## Questions I Still Have

- How does Express Router work internally?
- Why is Router a mini application?
- How does `app.use()` connect routers?

---

## Tomorrow

- Learn express.Router()
- Build first router
## Day 2

### Learned
- express.Router() returns a router object.
- Routes map URLs to controller functions.
- Controllers contain business logic.
- module.exports exports values from a file.
- require() imports exported values.

### Questions
- How does app.use() connect routers?
- How does Express internally store routes?

### Next Goal
- Build first authRouter and connect it with server.js.

# Day 3 - Express Architecture & JWT Fundamentals

## Date

26 June 2026

---

## Concepts Learned

### Express Architecture

* `express()` returns an Application Object.
* `express.Router()` returns a Router Object.
* `server.js` is responsible for configuring and starting the application.

### Request Lifecycle

Browser → Route → Controller → Model → Database → Model → Controller → Browser

### Routes

* Routes map HTTP requests to controller functions.
* They should not contain business logic.
* Related routes are grouped using `express.Router()`.

### Controllers

* Controllers contain business logic.
* Validate user input.
* Generate JWT after successful authentication.
* Send responses back to the client.

### Models

* Models communicate with the database.
* Handle CRUD operations.
* Abstract database logic from controllers.

### Middleware

* Runs before controllers.
* Prevents duplicate code.
* Verifies JWT.
* Creates `req.user`.
* Calls `next()` to continue the request lifecycle.

### Request Object

* `req.body` → Request body (JSON)
* `req.params` → URL parameters
* `req.query` → Query parameters
* `req.headers` → HTTP headers
* `req.cookies` → Cookies (after cookie-parser)
* `req.user` → Added by authentication middleware

### JWT Fundamentals

* JWT is created after successful login.
* Controller generates the JWT.
* Browser stores the JWT.
* Middleware verifies the JWT.
* JWT is protected using a server-side secret (`JWT_SECRET`).
* Changing JWT data invalidates the signature.
* Short expiration times improve security.

---

## Problems Faced

* Confused about why controllers exist.
* Didn't understand why routes shouldn't contain business logic.
* Confused about `module.exports` and object destructuring.
* Unsure how middleware shares authentication information.

---

## Solutions

* Learned Single Responsibility Principle.
* Understood Route → Controller → Model architecture.
* Learned object destructuring while importing controllers.
* Understood that middleware attaches authenticated user information to `req.user`.

---

## Questions Asked

* Why do we need controllers?
* Why does `express.Router()` exist?
* Why can't we use `app.post()` everywhere?
* Why are JWTs secure?
* Can hackers recover `JWT_SECRET` from many JWTs?
* Why should middleware verify JWT instead of controllers?
* Why does middleware call `next()`?

---

## Tomorrow's Goal

* Build the complete backend folder structure.
* Create authentication middleware.
* Connect routes, controllers, and models.
* Implement user registration.
* Connect MongoDB.

