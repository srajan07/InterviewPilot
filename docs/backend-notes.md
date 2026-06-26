Express

↓

Application Object

↓

Router

↓

Middleware

↓

Controller

↓

Model

↓

Database

###middleware
Browser

↓

Authorization Header

↓

JWT Token

↓

Middleware

↓

Verify JWT

↓

Decode JWT

↓

req.user = {
   id: "123",
   email: "abc@gmail.com"
}

↓

next()

↓

Controller
# Backend Notes

# Backend Request Flow

Browser

↓

Express Server

↓

Middleware

↓

Route

↓

Controller

↓

Model

↓

Database

↓

Response

↓

Browser

---

# Responsibilities

## server.js

* Create Express application.
* Configure middleware.
* Connect routers.
* Start server.

---

## Routes

* Handle URL mapping.
* Receive HTTP requests.
* Call controller functions.
* Do NOT contain business logic.

---

## Controllers

* Business logic.
* Validate input.
* Generate JWT.
* Send responses.
* Call models.

---

## Models

* Communicate with database.
* Perform CRUD operations.
* Hide database implementation.

---

## Middleware

* Execute before controllers.
* Authenticate users.
* Verify JWT.
* Modify request object.
* Call `next()`.

---

# Express Request Object

req.body
→ JSON request body

req.params
→ URL parameters

req.query
→ Query parameters

req.headers
→ HTTP headers

req.cookies
→ Browser cookies

req.user
→ Authenticated user (added by middleware)

---

# JWT Flow

Login Request

↓

Controller

↓

Validate Credentials

↓

Generate JWT

↓

Browser Stores JWT

↓

Future Request

↓

Authentication Middleware

↓

Verify JWT

↓

req.user

↓

Controller

---

# Important Principles

* Single Responsibility Principle (SRP)
* Don't Repeat Yourself (DRY)
* Separation of Concerns
* Middleware should contain reusable logic.
* Controllers should contain business logic.
* Models should communicate with the database.

---

# Things to Remember

* Express executes middleware from top to bottom.
* `express.Router()` creates a Router Object.
* `module.exports` exports values from a file.
* `require()` imports exported values.
* Controllers use models.
* Routes use controllers.
* Server uses routers.
* Middleware prepares the request before controllers execute.
