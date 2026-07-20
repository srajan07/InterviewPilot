const dummyQuestions = [
  {
    question: "What is the difference between let, const and var?",
    expectedAnswer:
      "var is function scoped, let and const are block scoped. const cannot be reassigned.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Explain JavaScript Closures.",
    expectedAnswer:
      "A closure is a function that remembers variables from its outer scope.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "What is the time complexity of Binary Search?",
    expectedAnswer: "O(log n)",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Explain Virtual DOM.",
    expectedAnswer:
      "Virtual DOM is a lightweight copy of the real DOM used by React for efficient updates.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Difference between SQL and NoSQL?",
    expectedAnswer:
      "SQL databases are relational while NoSQL databases are non-relational.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Explain the CAP theorem.",
    expectedAnswer:
      "A distributed system can provide only two of Consistency, Availability and Partition Tolerance.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "What is REST API?",
    expectedAnswer:
      "REST is an architectural style using stateless HTTP communication.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Difference between == and === ?",
    expectedAnswer:
      "== performs type coercion while === compares value and datatype.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "How would you design URL Shortener?",
    expectedAnswer:
      "Using Base62 encoding, unique IDs, database mapping and caching.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
  {
    question: "Difference between Process and Thread?",
    expectedAnswer:
      "Process has separate memory while threads share memory within a process.",
    userAnswer: "",
    aiFeedback: "",
    score: 0,
    isAnswered: false,
  },
];

module.exports = dummyQuestions;