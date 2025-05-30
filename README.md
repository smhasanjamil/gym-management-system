
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
## Relational Diagram

[Click Here to View the Relational Diagram](https://drive.google.com/file/d/1vYxd2r7MkmQxmsWZhNGQ_3Y7UIqS1pHN/view?usp=sharing)
## Technology Stack

- TypeScript  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT
- Zod
- Postman
## Admin Credentials

```ts
email: admin@gmail.com
password: 123456
```

### Trainer Credentials
```ts
email: rifat@gmail.com
password: 123456
```

### Trainee Credentials
```ts
email: sajib@gmail.com
password: 123456
```
## API Endpoints

### Auth

**1. Create a Trainee**

- `POST /api/v1/auth/register` – Signup as trainee

Description: Password must be at least 6 characters long. 

**Input:**
```json
{
    "name": "Khalid",
    "email": "khalid@gmail.com",
    "password": "123456"
}
```

**2. Login**

- `POST /api/v1/auth/login` – Login

Description: This login path is for admin, trainer, and trainee.

**Input:**
```json
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```

### User Management

**1. Create a trainer**

- `POST /api/v1/users/create-trainer` – Create a Trainer

**Input:**

```json
{
    "name": "Rahim",
    "email": "rahim@gmail.com",
    "password": "123456"
}
```

**Role:**

- Only **Admin** can create a trainer.

**2. Update Trainer**

- `PATCH /api/v1/users/trainers/:id` – Update Trainer

Description: Trainer ID must be valid and already exist in the database.

**Input:**

```json
{
    "name": "Karim",
    "email": "karim@gmail.com"
}
```

**Role:**

- Only **admin** can update a trainer data

**3. Update Trainee** 

- `PATCH /api/v1/users/trainee/:id` – Update Trainee

Description: Trainee ID must be valid and already exist in the database.

**Input:**

```json
{
    "name": "Pitu",
    "email": "pitu@gmail.com"
}
```
**Role:**

- **Admin** and **trainee** both can update trainee data.

**4. Delete Trainer**

- `DELETE /api/v1/users/trainers/:id` – Delete Trainer

Description: Trainer ID must be valid and already exist in the database.

**Role:**

- Only **admin** can delete a trainer.

**5. Delete Trainee**

- `DELETE /api/v1/users/trainee/:id` – Delete Trainee

Description: Trainee ID must be valid and already exist in the database.

**Role:**

- **Admin** and **trainee** both can delete trainee.

### Class Management

**1. Create and schedule a class**

- `POST /api/v1/class/create` – Create Class Schedule

    - Date Format: `'YYYY-MM-DD hh:mm AM/PM'`
    - A valid `trainer ID` (that exists in the database)  must be provided while creating a class schedule for assaign trainer.
    - Don't need to provide an end time, as each class duration is fixed to **2 hours (120 minutes)** in system.
    - Each day can have a maximum of **5 class schedules**.
    - Maximum of **10 trainees** per class schedule.

**Input:**
```json
{
    "name": "Evening Stretch",
    "date": "2025-05-31 11:30 AM",
    "trainer": "68382a97735b48d185d82810"
}
```

**Role:**

- Only **admin** can create a class schedule

**2. Get specific trainer's all classes and trainee who booked these class.**

- `GET /api/v1/class/trainer/:id` – Trainer can view assigned class.

Description: Trainer ID must be valid and already exist in the database.

**Role:**

- **Admin** and **trainer** both can view.

**3. Book a class**

- `POST /api/v1/class/book-class` – Book class

Description: Must provide valid **class ID** and **trainee ID** that already exist in the database.

- When a class is booked:
    - Trainee ID will be added to the class's `trainees` list.
    - Each class can have a maximum of **10 trainees**.
    - Booking information will be saved to the database.
    - A trainee **cannot book another class at the same time**.

**Input:**

```json
{
    "traineeId": "68382926735b48d185d827ef",
    "classId": "68389414be7bf12e7ad7b9b4"
}
```

**Role:**

- Only **trainee** can book a class.

**4. Cancel class schedule booking**

Description: You must provide a valid **class ID** (of the class that was booked) and a valid **trainee ID** to cancel a class booking.

- `DELETE /api/v1/class/cancel-class` – Cancel Class Booking

**Input:**

```json
{
    "classId": "68389414be7bf12e7ad7b9b4",
    "traineeId": "68382926735b48d185d827ef"
}
```

**Role:**

- **Admin** and **trainee** both can cancel booking.
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

### Use Postman/Thunder Client to Hit API Endpoints

- Base URL: `https://gym-management-system-ten.vercel.app`
- Test endpoints like:

####  Auth

- `POST /api/v1/auth/register` – Register a new trainee

- `POST /api/v1/auth/login` – Log in and receive JWT token

####  User

- `POST /api/v1/users/create-trainer` – Create a trainer

- `PATCH /api/v1/users/trainers/:id` – Update trainer details

- `PATCH /api/v1/users/trainee/:id` – Update trainee details

- `DELETE /api/v1/users/trainers/:id` – Delete a trainer
- `DELETE /api/v1/users/trainee/:id` – Delete a trainee

####  Class

- `GET /api/v1/class/trainer/:id` – Get all classes for a specific trainer
- `POST /api/v1/class/create` – Create a new class schedule

- `POST /api/v1/class/book-class` – Book a class as a trainee

- `DELETE /api/v1/class/cancel-class` – Cancel a booked class


A robust role-based backend system for managing gym operations including class scheduling, trainer assignment, and trainee bookings. Built with TypeScript, Express.js, Mongoose, and JWT Authentication, following a scalable Modular Architecture.