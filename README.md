# Apartment Listing Application

This is a full-stack application for managing apartment listings. It consists of a **frontend** built with React (Next.js) and a **backend** built with Node.js (Express) and Prisma ORM. The application is containerized using Docker for easy deployment.

---

## Table of Contents

- [Apartment Listing Application](#apartment-listing-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Running with Docker](#running-with-docker)
    - [Running Locally](#running-locally)
  - [API Endpoints](#api-endpoints)
    - [**GET /api/v1/apartments**](#get-apiv1apartments)
    - [**GET /api/v1/apartments/:id**](#get-apiv1apartmentsid)
    - [**POST /api/v1/apartments**](#post-apiv1apartments)
  - [Environment Variables](#environment-variables)
    - [Backend .env:](#backend-env)
    - [Frontend .env:](#frontend-env)
  - [License](#license)

---

## Features

- **Frontend**:

  - User-friendly interface for managing apartments.
  - Pagination, search, and filtering options.
  - Add, view, and manage apartment details.

- **Backend**:

  - [Postman API Docs](https://documenter.getpostman.com/view/31783929/2sB2qUmPrw)
  - RESTful API for apartment management.
  - Pagination, sorting, and filtering support.
  - Database integration with Prisma ORM.

- **Docker**:
  - Containerized frontend and backend for easy deployment.

---

## Technologies

- **Frontend**: React (Next.js), TypeScript, TailwindCSS
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

---

## Project Structure

```
apartment-listing/
├── backend/               # Backend service
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Middleware (e.g., validation)
│   │   ├── routes/        # API routes
│   │   ├── database/      # Prisma configuration
│   │   └── index.ts       # Entry point
│   └── Dockerfile         # Backend Dockerfile
├── frontend/              # Frontend service
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # Reusable components
│   │   └── lib/           # Axios configuration
│   └── Dockerfile         # Frontend Dockerfile
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Running with Docker

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/apartment-listing.git
   cd apartment-listing
   ```

2. **Start the Services**:
   Run the following command to build and start the containers:

   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)

4. **Stop the Services**:
   To stop the containers, run:
   ```bash
   docker-compose down
   ```

---

### Running Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/apartment-listing.git
   cd apartment-listing
   ```

2. **Backend Setup**:

   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up the database using Prisma:
     ```bash
     npx prisma migrate dev
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - The backend will run at [http://localhost:5000](http://localhost:5000).

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```
   - The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### **GET /api/v1/apartments**

Fetch a paginated list of apartments with optional filters for search, projects, and sorting.

### **GET /api/v1/apartments/:id**

Fetch details of a specific apartment by its ID.

### **POST /api/v1/apartments**

Add a new apartment to the database.

For detailed API documentation, refer to the backend code or API documentation tool (e.g., Postman).

---

## Environment Variables

Create a .env file in both the backend and frontend directories with the following variables:

### Backend .env:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/apartment_db
DOMAIN=http://localhost
```

### Frontend .env:

```env
# Running locally
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
# Running with Docker
NEXT_PUBLIC_API_URL=http://backend:5000/api/v1
```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

```

This `README.md` provides a clear and structured guide for setting up and running the project using Docker or locally. Let me know if you need further adjustments!This `README.md` provides a clear and structured guide for setting up and running the project using Docker or locally. Let me know if you need further adjustments!
```
