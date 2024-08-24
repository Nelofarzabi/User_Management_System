# User Management System


This project is developed using Node.JS, TypeScript, MySQL, and Sequelize ORM for managing users, roles, and permissions. The project includes comprehensive user management with JWT authentication, role-based authorization, and a focus on test-driven development.

## 📗 Table of Contents

- [TDD](#tdd)
- [Built With](#built-with)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [Show your support](#show-your-support)
- [Acknowledgments](#acknowledgments)
- [📝 License](#license)

## TDD

This project is developed using Test-Driven Development (TDD) principles, ensuring high-quality and maintainable code. Unit tests are written using Jest to cover key functionalities such as user management, authentication, and authorization.

## Built With

- **Node.js** - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeScript** - A strict syntactical superset of JavaScript that adds optional static typing.
- **MySQL** - A relational database management system based on SQL.
- **Sequelize ORM** - A promise-based Node.js ORM for MySQL.
- **JWT** - JSON Web Tokens for secure user authentication and authorization.

## Tech Stack

**Server:**  
- Node.js  
- Express.js  

**Database:**  
- MySQL  

**Testing:**  
- Jest  
- Supertest

## Key Features

- **User Management:** Create, update, delete, and retrieve users with role assignments.
- **Authentication & Authorization:** Secure authentication with JWT and role-based authorization.
- **API Endpoints:** RESTful API endpoints for user and role management.
- **Sequelize ORM:** Efficient database management with Sequelize.
- **TypeScript:** Strongly typed language features for better code quality.
- **TDD:** Comprehensive unit tests for all key functionalities using Jest.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git:** Version control system.
- **Node.js:** JavaScript runtime environment.
- **npm or yarn:** Package managers.
- **MySQL:** Relational database management system.
- **TypeScript:** Static type-checking for JavaScript.

### Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Nelofarzabi/User_Management_System.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd user-management-system
    ```

3. **Set up the environment variables:**
   Create a `.env` file in the root directory and add your database configuration and JWT secret.

### Install

Install the dependencies:
```bash
npm install or yarn install
```

### Usage
To run the project, execute the following command:
```bash
npm start
```

This will start the server in development mode. Open your browser and go to http://localhost:3000/api/v1/.

### Run tests
To run tests, execute the following command:
```bash
npm test
```
This will run all unit tests and display the results. You can also check for TypeScript errors by running:
```bash
npm run lint
```

## Author
👤 **Nelofar Zabi**

- GitHub: [@githubhandle](https://github.com/Nelofarzabi)
- Twitter: [@twitterhandle](https://twitter.com/NelofarZabi)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/nelofar-zabi-1a1066213)


## 🔭 Future Features <a name="future-features"></a>

-  **Advanced Authorization: Implement fine-grained permissions for different roles.**
-  **API Documentation: Add Swagger for API documentation.**
-  **Integration Tests: Add more comprehensive integration tests.**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Nelofarzabi/User_Management_System/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Thanks to my mentor for his valuable feedback and support throughout the development process.
- A big thank you to the open-source community for the tools and resources that made this project possible.

## 📝 License

This project is [MIT](./https://github.com/Nelofarzabi/User_Management_System/#MIT-1-ov-file) licensed.


<p align="right">(<a href="#readme-top">back to top</a>)</p>