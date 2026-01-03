# Deployment Guide

## ✅ PostgreSQL Migration Complete!

Your application has been migrated from SQLite to PostgreSQL and is ready for Vercel deployment.

## 🚀 Quick Start - Deploy to Vercel

**See `VERCEL_DEPLOY.md` for detailed deployment instructions.**

### Quick Steps:

1. Create a Vercel Postgres database in your Vercel dashboard
2. Set environment variables:
   - `SESSION_SECRET` (generate a random string)
   - `NODE_ENV=production`
   - `POSTGRES_URL` (auto-set by Vercel Postgres)
3. Deploy via GitHub or Vercel CLI

## 📋 Database Status

- ✅ Migrated to PostgreSQL
- ✅ Uses connection pooling
- ✅ Compatible with Vercel Postgres
- ✅ Supports local development with DATABASE_URL

## 🔄 Alternative Deployment Options

If you prefer not to use Vercel, consider:

1. **Railway.app** - Also supports PostgreSQL, easy deployment
2. **Render.com** - Supports PostgreSQL, free tier available
3. **Fly.io** - Good for PostgreSQL deployments
4. **Heroku** - Paid option with PostgreSQL add-ons

## 🚀 Deployment Steps for Vercel (PostgreSQL Ready)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Create a Vercel Postgres Database**:
   - Go to https://vercel.com/dashboard
   - Create a new project
   - Go to Storage tab
   - Create a Postgres database

4. **Update your database connection**:
   - Install PostgreSQL client: `npm install pg`
   - Update `database/db.js` to use PostgreSQL instead of SQLite

5. **Set Environment Variables**:
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add:
     - `SESSION_SECRET` (generate a random string)
     - `POSTGRES_URL` (from your Vercel Postgres database)

6. **Deploy**:
   ```bash
   vercel
   ```

### Option 2: Quick Deploy via GitHub

1. **Push your code to GitHub**

2. **Import project on Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Set Environment Variables** in Vercel dashboard

4. **Deploy**

## 🔧 Recommended: Switch to PostgreSQL for Vercel

If you want to deploy to Vercel, I recommend switching to PostgreSQL. Here's what needs to change:

### 1. Update package.json:
```json
{
  "dependencies": {
    "pg": "^8.11.3",
    "@vercel/postgres": "^0.5.1"
  }
}
```

### 2. Update database/db.js to use PostgreSQL

### 3. Update session store (optional but recommended):
Use `connect-pg-simple` for PostgreSQL-backed sessions.

## 🎯 Alternative: Deploy to Railway (Supports SQLite)

Railway is better suited for your current SQLite setup:

1. **Sign up at** https://railway.app
2. **Install Railway CLI**: `npm i -g @railway/cli`
3. **Login**: `railway login`
4. **Initialize**: `railway init`
5. **Deploy**: `railway up`
6. **Set environment variables** in Railway dashboard

Railway supports:
- ✅ SQLite databases
- ✅ Persistent file storage
- ✅ Node.js applications
- ✅ Free tier available

## 📝 Environment Variables Needed

For Vercel deployment, set these in your Vercel dashboard:

- `SESSION_SECRET` - A random secret string for session encryption
- `NODE_ENV` - Set to `production`
- Database connection string (if using external database)

## 🔐 Security Notes

- Always use a strong `SESSION_SECRET` in production
- Use HTTPS (automatic on Vercel)
- Consider using Redis for sessions in production
- Enable secure cookies in production

## 📚 Additional Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Railway Docs: https://docs.railway.app

