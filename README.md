# To-Do App with User Authentication


## Introduction

Welcome to the To-Do App with User Authentication project! This application is built using Node.js, Express, and MongoDB, allowing users to create, read, update, and delete their to-do tasks after authenticating.

You can access the hosted application [here](link-to-hosted-app).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Security](#security)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Postman](#PostmanCollection)


## Features

- **User Authentication**: Users must log in to access and manage their to-do tasks, ensuring data privacy. JWT (JSON Web Tokens) are used for secure authentication.

- **Create**: Users can add new tasks with titles, descriptions, and due dates.

- **Read**: Users can view their to-do tasks, including details and completion status.

- **Update**: Users can edit task details and mark tasks as completed.

- **Delete**: Users can delete tasks they no longer need.

## Demo

You can access a live demo of the To-Do App [here](link-to-demo).

## Installation

To run the To-Do App locally, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/your-username/To-do-app.git
cd To-do-app
```

2. Install the required dependencies.

```bash
npm install
```

3. Set up the environment variables in a `.env` file, including the MongoDB connection URI and a secret key for JWT token generation.

```env
MONGODB_URL=your-MongoDB-URL
JWT_SECRET_KEY=your-secret-key
EXPIRES_IN = days
JWT_COOKIE_EXPIRES_IN = as-per-your-choice

```

4. Start the application.

```bash
npm start
```

The app will be available at `http://localhost:1101`.

## Usage

1. Register for an account on the To-Do App or use your existing credentials to log in.

2. Once logged in, you can start adding, editing, and managing your to-do tasks.

## Authentication

User authentication is an essential part of this application, and it is secured using JSON Web Tokens (JWT). JWT tokens are generated and validated to ensure that only authorized users can access and manipulate their to-do tasks.

## Security

Security is a top priority in our To-Do App. We have implemented several security measures, including:

- **Helmet**: We use the Helmet middleware to set various HTTP headers that enhance security, including preventing common web vulnerabilities.

- **Express Sanitize and XSS Protection**: Data input from users is sanitized and validated using libraries like `express-sanitize` and `xss` to protect against cross-site scripting (XSS) attacks.

## API Endpoints

The To-Do App exposes the following API endpoints:

- `POST /signup`: Register a new user.
- `POST /login`: Log in an existing user.
- `GET /tasks`: Get all tasks for the authenticated user.
- `POST /tasks`: Create a new task for the authenticated user.
- `PATCH /task/:taskId`: Update details of a specific task.
- `DELETE /todo/:taskId`: Delete a specific task.

## Database

The application uses MongoDB as its database to store user information and to-do tasks. MongoDB provides flexibility and scalability for managing user data and tasks efficiently.

## Postman Collection 

We have integrated Postman for easy testing of our API endpoints. You can find the Postman collection and environment files in the Postman directory of this repository. Import these files into Postman to start testing the API.

Thank you for using the To-Do App with User Authentication! We are committed to providing a secure and efficient task management experience.

Happy task management! ✅📅
