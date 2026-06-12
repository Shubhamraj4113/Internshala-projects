# 🎥 YouTube Clone (MERN Stack)

A full-stack YouTube Clone built using the MERN Stack that allows users to browse videos, search content, create channels, upload videos, and interact through comments and authentication.

---

## 🚀 Features

### User Authentication
- Register new account
- Login / Logout
- JWT Authentication
- Protected Routes

### Video Features
- View videos
- Search videos
- Upload videos
- Edit/Delete own videos
- Video details page

### Channel Features
- Create channel
- View channel profile
- Manage uploaded videos

### Comments
- Add comments
- Edit comments
- Delete comments

### UI Features
- Responsive design
- YouTube-inspired layout
- Sidebar navigation
- Category filters
- Mobile-friendly interface

---

# 🛠 Tech Stack

## Frontend
- React 18
- React Router DOM
- Axios
- Vite
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- BcryptJS

---

# 📂 Project Structure

```bash
Youtube-clone
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│
├── backend
│   ├── src
│   │   ├── routes
│   │   ├── models
│   │   ├── middleware
│   │   └── data
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/youtube-clone.git
cd youtube-clone
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌱 Seed Database

Populate sample videos and users:

```bash
cd backend
npm run seed
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Videos

| Method | Endpoint |
|----------|------------|
| GET | /api/videos |
| GET | /api/videos/:id |
| POST | /api/videos |
| PUT | /api/videos/:id |
| DELETE | /api/videos/:id |

---

## Channels

| Method | Endpoint |
|----------|------------|
| GET | /api/channels/:id |
| POST | /api/channels |

---

## Comments

| Method | Endpoint |
|----------|------------|
| POST | /api/comments |
| PUT | /api/comments/:id |
| DELETE | /api/comments/:id |

---

# 📱 Responsive Design

Supports:

- Desktop
- Tablet
- Mobile Devices

Sidebar automatically adapts to screen size and overlays content on smaller screens.

---

# Future Improvements

- Like/Dislike System
- Subscribe Channels
- Watch History
- Notifications
- Video Recommendations
- Dark Mode
- Real Video Uploads (Cloudinary/S3)

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Developed as a MERN Stack Capstone Project.


# Repo Link
https://github.com/Shubhamraj4113/Internshala-projects