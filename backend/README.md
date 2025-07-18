🗂️ Around the U.S. – Back-End API

This is the back-end of the Around the U.S. application, a REST API built with Node.js and Express. It manages user and card data, serving as a communication layer between the client and the resources stored on the server.
📦 Technologies Used

    Node.js — JavaScript runtime environment for the server-side
    Express.js — A minimalist and flexible framework for creating HTTP servers
    File System (fs) — Reading and manipulating JSON files
    ESLint — Linter to ensure code standardization and quality
    EditorConfig — Shared configuration for code style
    Nodemon — Monitoring and automatic reloading during development

📁 Directory Structure

/
├── data/         # JSON files simulating a database
├── routes/       # Route definitions for users and cards
├── app.js        # Main file of the Express application
├── package.json  # Project metadata and scripts

🚀 How to Run

    Install dependencies:

npm install

    Start the server:

npm run start

    For development with hot reload:

npm run dev

📡 API Endpoints
Method 	Route 	Description
GET 	/users 	Returns all users
GET 	/users/:id 	Returns a user by their _id
GET 	/cards 	Returns all cards
📘 Response Codes

    200 OK – Successful request
    404 Not Found – Resource not found
    500 Internal Server Error – Server error

🧪 Requirements

    Node.js ^18.x or higher
    npm ^9.x or higher
