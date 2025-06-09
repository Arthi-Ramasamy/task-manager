
# Task Manager Application

A MERN stack (MongoDB, Express.js, React, Node.js) web app for managing tasks with user authentication, calendar view, reminders, and filtering/sorting.

---

## Features

- Secure login/register with JWT
- Task CRUD (title, due date, priority, category)
- Calendar view (React Calendar)
- Browser notifications for reminders
- Filter/sort tasks by category, priority, and status
- Responsive UI for desktop and mobile

---

## Tech Stack

**Frontend:**
- React
- Vite
- React Calendar
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## Setup

### Clone Repository

```bash
git clone https://github.com/Arthi-Ramasamy/task-manager.git
cd task-manager
````

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with the following:

```
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=mysecretkey123
```

Start MongoDB locally (or connect to Atlas), then run:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

---

## Access

* Open `http://localhost:5173`
* Register or log in
* Manage your tasks easily

---

## Usage

* Add tasks with title, due date, priority, and category
* View tasks in list or calendar view
* Enable notifications for reminders
* Filter and sort tasks based on your needs

