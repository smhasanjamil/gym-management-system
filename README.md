
# Gym Class Scheduling and Membership Management System

A role-based backend application built with TypeScript, Node.js, Express.js, Mongoose, and MongoDB to efficiently manage gym operations such as class scheduling, trainer assignment, and trainee bookings. This system ensures a secure, scalable, and organized workflow for gyms, following a modular architecture and JWT-based authentication.
## Live Server Link

[Click Here to View the Live Server](https://gym-management-system-ten.vercel.app/)

## Project Overview

This system is designed to automate and streamline gym management tasks by defining three user roles: Admin, Trainer, and Trainee, each with distinct permissions:

- **Admins** manage trainers, create and schedule classes (up to 5 per day), and assign trainers to these classes.
- **Trainers** can view their assigned schedules but cannot manage other resources.
- **Trainees** can create their profiles and book classes (up to 10 trainees per class) with time conflict and limit checks.

The system enforces strict business rules, provides comprehensive error handling, and protects all endpoints using JWT authentication with role-based authorization.
## Key Features

### Role-Based Access

- **JWT Authentication** for secure login
- Middleware to enforce **role-specific permissions**

### Admin Functionality

- Create/manage trainers
- Schedule up to **5 classes per day**
- Assign trainers to class schedules

### Trainer Functionality

- View own assigned class schedules
- Cannot modify users or schedules

### Trainee Functionality

- Register and manage own profile
- Book available classes (up to **10 trainees per class**)
- Cancel existing bookings
- Prevent double-booking in the same time slot

### Business Logic & Constraints

- Max 5 class schedules per day
- Each class lasts 2 hours
- Max 10 trainees per class schedule
- Conflict detection for time-slot double bookings
- Restriction on overbooking and overscheduling

### Error Handling

- **Global error middleware** for structured error responses
## Relational Diagram

[Click Here to View the Relational Diagram](https://drive.google.com/file/d/1vYxd2r7MkmQxmsWZhNGQ_3Y7UIqS1pHN/view?usp=sharing)
## Technology Stack

- TypeScript  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT

## API Endpoints

### Auth

- `POST /api/v1/auth/register` – Create user/trainee a user.
- `POST /api/v1/auth/login` – Login

### User

- `POST /api/v1/users/create-trainer` – Create Trainer
- `PATCH /api/v1/users/trainers/:id` – Update Trainer
- `PATCH /api/v1/users/trainee/:id` – Update Trainee
- `DELETE /api/v1/users/trainers/:id` – Delete Trainer
- `DELETE /api/v1/users/trainee/:id` – Delete Trainee

### Class

- `GET /api/v1/class/trainer/:id` – Get specific trainer's all classes.
- `POST /api/v1/class/create` – Create Class Schedule
- `POST /api/v1/class/book-class` – Book class
- `DELETE /api/v1/class/cancel-class` – Cancel Class Booking
## Database Schema

### User Schema
```ts
{
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "trainer", "trainee"],
      default: "trainee",
    },
  },
  {
    timestamps: true,
  }
  ```

  ### Class Cheduling Schema

  ```ts
  {
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, default: 120 },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  trainees: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
}
  ```

  ### Booking Schema

  ```ts
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "ClassSchedule",
      required: true,
    },

    traineeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
  ```
## Admin Credentials

```ts
email: admin@gmail.com
password: 123456
```
## Run Locally

### Installation

Clone git repository:
```
git clone https://github.com/smhasanjamil/gym-management-system.git
cd gym-management-system
npm install
npm run dev
```

Create `.env` file in the root:
```ts
# NODE_ENV=development
NODE_ENV=production
PORT=5000

DATABASE_URL=
BCRYPT_SALT_ROUNDS=12

# jwt
JWT_ACCESS_SECRET=9d0695dc12e37a0aff4c5a0b17fdc1d494f72c78d3329eed8a23b64554620bc3
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=4d6b2efd99a999cee14f1b63b62cb85f2dcf80ca43d57eb2388196940e906f5e97b61becd8064694aec3e58b863f3682abe77de44a4c2a2af5d9a2b77000ab92
JWT_REFRESH_EXPIRES_IN=1y
```
## Live Hosting Link

[Click Here to View the Live Server](https://gym-management-system-ten.vercel.app/)

## Postman documentation

[Click Here to View the Postman documentation](https://documenter.getpostman.com/view/38506814/2sB2qfAywD)

## Testing

### Admin Credentials for testing

```ts
email: admin@gmail.com
password: 123456
```

This project supports manual API testing using Postman.

### Use Postman to Hit API Endpoints

- Base URL: `https://gym-management-system-ten.vercel.app/api/v1`
- Test endpoints like:

####  Auth

- `POST /auth/register` – Register a new trainee
Input syntax
```json
{
    "name": "Trainee1",
    "email": "tarinee1@gmail.com",
    "password": "123456"
}
```
- `POST /auth/login` – Log in and receive JWT token
Input syntax
```json
{  
    "email": "admin@gmail.com",
    "password": "123456"
}
```
####  User

- `POST /users/create-trainer` – Create a trainer
Input syntax
```json
{
    "name": "Trainer1",
    "email": "trainer1@gmail.com",
    "password": "123456"
}
```
- `PATCH /users/trainers/:id` – Update trainer details
Input syntax
```json
{
    "name": "User One"
}
```
- `PATCH /users/trainee/:id` – Update trainee details
Input syntax
```json
{
    "name": "Traine One"
}
```
- `DELETE /users/trainers/:id` – Delete a trainer
- `DELETE /users/trainee/:id` – Delete a trainee

####  Class

- `GET /class/trainer/:id` – Get all classes for a specific trainer
- `POST /class/create` – Create a new class schedule
Input syntax
```jshon
{
    "name": "Evening Stretch",
    "date": "2025-05-31 11:30 AM",
    "trainer": "68382a97735b48d185d82810"
}
```
- `POST /class/book-class` – Book a class as a trainee
Input syantax
```json
{
    "traineeId": "68382926735b48d185d827ef",
    "classId": "68389414be7bf12e7ad7b9b4"
}
```
- `DELETE /class/cancel-class` – Cancel a booked class
Input syntax
```json
{
    "classId": "68389414be7bf12e7ad7b9b4",
    "traineeId": "68382926735b48d185d827ef"
}
```

A robust role-based backend system for managing gym operations including class scheduling, trainer assignment, and trainee bookings. Built with TypeScript, Express.js, Mongoose, and JWT Authentication, following a scalable Modular Architecture.