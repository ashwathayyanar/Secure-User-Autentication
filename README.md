# User Authentication System

A secure, full-stack user authentication system built with Node.js, Express, PostgreSQL, and vanilla JavaScript. Features user registration, login, session management, and role-based access control (User/Admin roles).

## ✨ Features

- 🔐 Secure user registration and login
- 🔒 Password hashing with bcrypt
- 📊 Session-based authentication
- 👥 Role-based access control (User/Admin)
- 🛡️ Protected routes and middleware
- 🎨 Modern, responsive UI with beautiful design
- 🚀 Ready for Vercel deployment
- 🗄️ PostgreSQL database

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Security**: bcrypt, express-session
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (local or cloud)
- npm or yarn

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
```

### 3. Set Up Database

The database table will be created automatically on first run. Make sure PostgreSQL is running and the database exists.

To create the database manually:
```sql
CREATE DATABASE user_auth;
```

### 4. Run the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
├── api/
│   └── index.js          # Vercel serverless entry point
├── database/
│   └── db.js             # PostgreSQL connection and helpers
├── middleware/
│   ├── authMiddleware.js # Authentication middleware
│   └── roleMiddleware.js # Role-based access control
├── routes/
│   └── authRoutes.js     # Authentication routes
├── public/
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       └── auth.js       # Client-side JavaScript
├── views/
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── dashboard.html    # User dashboard
│   └── admin.html        # Admin panel
├── server.js             # Express server (local development)
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## 🔐 API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user (protected)

## 🛣️ Routes

- `/` - Redirects to login
- `/login.html` - Login page
- `/register.html` - Registration page
- `/dashboard` - User dashboard (protected)
- `/admin` - Admin panel (admin only)

## 🚀 Deployment

### Deploy to Vercel

See `VERCEL_DEPLOY.md` for detailed instructions.

**Quick Steps:**
1. Create Vercel Postgres database
2. Set environment variables
3. Deploy via GitHub or CLI

### Other Platforms

The application can also be deployed to:
- Railway
- Render
- Fly.io
- Heroku

See `DEPLOYMENT.md` for more options.

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication
- Secure HTTP-only cookies
- SQL injection prevention (parameterized queries)
- Input validation
- Role-based access control

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string (local) | For local dev |
| `POSTGRES_URL` | PostgreSQL connection string (Vercel) | For Vercel |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `NODE_ENV` | Environment (development/production) | Recommended |

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC

## 🙏 Acknowledgments

- Images from Unsplash
- Built with modern web technologies

