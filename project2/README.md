# QuickNotes System Design & API Client

QuickNotes is transitioning from a local browser app to a full-stack, highly scalable online service. This repository contains the front-end API client that interacts with a backend via RESTful endpoints, alongside the comprehensive system design documents required to scale the application to 1 million users.

## How to Run the API Client

1. Clone this repository to your local machine.
2. Open `index.html` in any modern web browser.
3. The app will fetch and display mock data using the JSONPlaceholder API. You can test loading, creating, and deleting notes directly in the UI.

## System Design Documentation

The backend architecture and data models are fully documented in the `docs/` folder for the engineering team:

- [API Design](docs/api-design.md): RESTful endpoints, request/response examples, and error handling.
- [Data Model](docs/data-model.md): SQL schema, relationships, example queries, and indexing.
- [Architecture](docs/architecture.md): Scalability estimates, system diagram, request flows, and trade-offs.

## What I Learned

Through building this project, I learned how to:

1. Connect a frontend interface to an external REST API using JavaScript's `fetch`, `async / await`, and robust `try / catch` error handling.
2. Design a relational database schema from scratch, explicitly mapping out one-to-many and many-to-many relationships using join tables.
3. Architect a highly available, scalable backend system utilizing load balancers, caching, and database read replicas to handle massive read-heavy workloads.
