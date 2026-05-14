# College Management & Learning System

## Top Objectives of the System

1. Centralized platform for managing students, faculty, admins, courses, assignments, notes, and broadcasts.
2. Role-based access control for secure and organized academic management.
3. Simplified communication and document sharing between admins, faculty, and students.

---

# System Roles

## Admin

Admins have full control over the system.

### Admin Permissions

- Create, update, and delete users
- Manage students and faculty
- Create and manage courses and subjects
- Upload notes and assignments
- Delete any uploaded content
- Send broadcast messages to all users
- Manage departments and course structures

---

## Faculty

Faculty members have limited management permissions.

### Faculty Permissions

- Upload notes and assignments
- Send broadcast messages
- Manage course-related materials
- View students of assigned courses
- Cannot delete admin content
- Cannot manage faculty or admin accounts

---

## Student

Students can only access learning resources.

### Student Permissions

- View notes and assignments
- Download uploaded study materials
- Receive broadcast messages
- Access course-specific subjects

---

# Broadcast Messaging System

## Features

### Admin Broadcast Permissions

Admins can send broadcasts to:

- All students
- All faculty
- All admins
- Entire system

### Faculty Broadcast Permissions

Faculty members can:

- Send broadcast messages to students

### Student Restrictions

Students cannot send broadcasts.

### Notification System

Broadcasts appear in dashboard notifications.

---

# User Management

## Admin Management Capabilities

Admins can:

- Add new students
- Add new faculty members
- Edit user details
- Remove users
- Assign courses to faculty and students

> Faculty and students cannot manage accounts.

---

# Course Structure

## Computer Science

### Subjects

- Data Structures & Algorithms (DSA)
- Operating Systems (OS)
- Database Management System (DBMS)

---

## Mechanical Engineering

### Subjects

- Thermodynamics
- Fluid Mechanics

---

## Electrical Engineering

### Subjects

- Circuits
- Signals & Systems

---

# Notes & Assignment Module

## Upload Features

Admins and faculty members can upload:

- Notes
- Assignments
- PDFs
- Study materials

---

## Visibility Rules

Uploaded content is visible based on:

- Course
- Subject
- User role

### Example

- Computer Science students can only view Computer Science materials.
- Mechanical Engineering students can only view Mechanical Engineering materials.

---

# Content Access Rules

| Role     | Upload | Delete | Broadcast | Manage Users |
| -------- | ------ | ------ | ---------- | ------------- |
| Admin    | Yes    | Yes    | Yes        | Yes           |
| Faculty  | Yes    | No     | Yes        | No            |
| Student  | No     | No     | No         | No            |

---

# Suggested System Modules

1. Authentication System
2. Dashboard
3. User Management
4. Course Management
5. Broadcast Messaging System
6. Notes Upload Module
7. Assignment Management
8. Notification System
9. Role-Based Access Control (RBAC)
10. File Management System

---

# Technology Stack

## Frontend Technologies

- **React.js** — Used for building a fast and interactive user interface.
- **Tailwind CSS** — Used for responsive and modern UI styling.

---

## Backend Technologies

- **Node.js** — Runtime environment for server-side development.
- **Express.js** — Framework for building REST APIs and backend services.
- **MongoDB** — NoSQL database used for storing users, courses, assignments, notes, and broadcasts.
- **Mongoose** — ODM library used for MongoDB schema modeling and database operations.

---

## Authentication & Security

- **JWT Authentication using the `jsonwebtoken` library** — Secure token-based authentication for Admin, Faculty, and Student login systems.
- **bcryptjs** — Used for password hashing and account security.

---

## File Upload & Storage

- **Multer** — Middleware used for uploading notes, assignments, PDFs, and study materials.

---

## Additional Backend Utilities

- **CORS** — Enables secure communication between frontend and backend.
- **dotenv** — Manages environment variables and sensitive configuration securely.

---

# Purpose of the System

This system is designed to help colleges and educational institutions manage:

- Academic resources
- Communication
- Student learning materials
- Faculty operations
- Course management

through one centralized digital platform.