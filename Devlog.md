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
