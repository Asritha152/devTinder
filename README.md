
# DevTinder 💼🔥  
A full-stack MERN application where people can register, login, edit their profiles, view other profiles, and connect with people they are interested in (or ignore if not interested).  

---

## 🚀 Features
- **Authentication**
  - Register, Login, Logout
  - JWT/Cookie-based authentication
  - Secure password hashing with bcrypt
- **Profile Management**
  - View your profile
  - Edit/update details (skills, bio, gender, profile URL, etc.)
  - Change password with strong validation
- **Connections**
  - Send requests (Interested / Ignored)
  - Review requests (Accept / Reject)
  - View accepted connections
  - Paginated user feed excluding existing connections & self
- **Frontend**
  - Built with React (Vite)
  - Context API / Redux for state management
  - Responsive UI with reusable components

---

## 🛠️ Tech Stack
**Frontend:** React, React Router, Context API/Redux, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ODM)  
**Auth & Security:** JWT / Cookies, bcrypt, validator  
**Other Tools:** Vite, npm  

---

## ⚡ Installation & Setup

### 1. Clone the repo
```bash
git clone [https://github.com/yourusername/devtinder.git](https://github.com/yourusername/devtinder.git)
cd devtinder
````

### 2\. Setup Backend

```bash
cd backend
npm install
```

#### Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Run backend:

```bash
npm run dev
```

### 3\. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

-----

### 🔑 API Endpoints

#### Auth

  - `POST /api/auth/register` → Register new user
  - `POST /api/auth/login` → Login
  - `GET /api/auth/logout` → Logout

#### Profile

  - `GET /api/user/` → Get profile
  - `PUT /api/user/edit` → Edit profile
  - `PATCH /api/user/forgotpassword` → Change password

#### Connections

  - `POST /api/connections/send/:status/:toUserId` → Send connection request
  - `POST /api/connections/review/:status/:requestId` → Review request
  - `GET /api/connections/connections` → Get all accepted connections
  - `GET /api/connections/requestsreceived` → Get received requests
  - `GET /api/connections/feed?page=1&limit=10` → Paginated user feed

-----

### 🎯 Future Improvements

  - Real-time notifications with Socket.io
  - Profile photo uploads with Cloudinary / AWS S3
  - Chat system between connections
  - Advanced search & filters in feed

-----

### 🤝 Contributing

Pull requests are welcome\! For major changes, please open an issue first to discuss what you’d like to change.

-----

### 📜 License

This project is licensed under the MIT License.
