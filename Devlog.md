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
## Day 4

### Learned
- Created my  Mongoose schema.
- Understood the difference between Schema and Model.
- Learned why controllers call `User.create()`.
- Understood `module.exports` and `require()`.
- Fixed MongoDB connection issues by upgrading Node.js and starting the MongoDB service.

### Next Goal
- Build the Register API.
- Learn password hashing with bcrypt.

- # Day 5 - User Model & Registration Flow

## ✅ Completed

- Created the User Mongoose Schema.
- Learned the difference between Schema and Model.
- Added validation for:
  - fullName
  - email
  - password
  - role
- Configured timestamps in Mongoose.
- Understood why controllers use the User model.
- Learned `module.exports` and `require`.
- Designed the complete registration workflow.
- Understood why duplicate emails should not be allowed.
- Learned `User.findOne()` vs `User.create()`.
- Learned password hashing using `bcrypt.hash()`.
- Learned password verification using `bcrypt.compare()`.
- Understood why passwords are never stored in plain text.

## 🧠 Key Concepts Learned

- Route → Controller → Model → MongoDB
- Request lifecycle
- Object destructuring (`req.body`)
- Validation before database operations
- Truthy and falsy values (`null` vs object)
- Why `return res.status()` stops controller execution
- Difference between Authentication and Authorization
- Why JWT is generated only after successful login

## 🎯 Next Goal

- Build the Register Controller
- Save users into MongoDB
- Test registration using Postman
# Day 7 - Login API

## ✅ Completed
- Implemented Login Controller
- Validated login input
- Found user using User.findOne()
- Compared passwords using bcrypt.compare()
- Generated JWT using jwt.sign()
- Returned authentication token
- Improved authentication error handling
- Learned secure JWT payload design

## 🧠 Key Concepts Learned
- Authentication flow
- JWT payload
- bcrypt.compare()
- 401 Unauthorized
- Why HTTP-only cookies are more secure than localStorage for JWTs
- Why APIs should not reveal whether the email or password was incorrect

## 🎯 Next Goal
- Build JWT Authentication Middleware
- Verify tokens
- Protect private routes
- Understand req.user
# Day 8 - JWT Authentication Middleware

## ✅ Completed
- Created authMiddleware
- Read JWT from Authorization header
- Extracted Bearer token
- Verified JWT using jwt.verify()
- Stored decoded payload in req.user
- Used next() to continue request
- Protected routes using middleware

## 🧠 Learned
- req.headers.authorization
- Bearer Token format
- jwt.verify()
- req.user
- next()
- Difference between middleware and controllers

## 🎯 Next Goal
- Build Get Profile API
- Use req.user.id
- Fetch logged-in user using User.findById()
# Day 14-16 - Advanced MongoDB & Express

## ✅ Completed

- Added Question validation middleware
- Validated difficulty and category
- Learned middleware chaining
- Added createdBy relationship using ObjectId
- Learned One-to-Many relationships
- Learned ref and populate()
- Implemented query parameter filtering
- Built dynamic MongoDB filters using req.query

## 🧠 Key Concepts Learned

- ObjectId
- ref
- populate()
- req.query
- Dynamic filters
- MongoDB search
- Database relationships
- One-to-Many mapping

## 🎯 Next Goal

- Pagination
- Sorting
- Search by keyword
- Advanced MongoDB queries
- 
