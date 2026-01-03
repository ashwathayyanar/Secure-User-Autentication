# Deploying to Vercel with PostgreSQL

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub account (recommended) or Vercel CLI
3. PostgreSQL database (Vercel Postgres recommended)

## Step 1: Set Up Vercel Postgres Database

1. Go to https://vercel.com/dashboard
2. Click on your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name and region
7. Click **Create**
8. Your database is created! The connection string will be automatically available as `POSTGRES_URL`

## Step 2: Install Dependencies Locally (Optional)

Before deploying, you can test locally:

```bash
npm install
```

## Step 3: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click **Import Git Repository**
   - Select your repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables:**
   - In the Vercel project settings, go to **Settings** > **Environment Variables**
   - Add the following:
     - `SESSION_SECRET` - Generate a random string (e.g., use `openssl rand -base64 32`)
     - `NODE_ENV` - Set to `production`
     - `POSTGRES_URL` - This is automatically set if you created Vercel Postgres, but verify it's there

4. **Deploy:**
   - Click **Deploy**
   - Wait for the deployment to complete

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Link to Vercel Postgres:**
   ```bash
   vercel link
   ```
   Follow the prompts to link your database.

4. **Set Environment Variables:**
   ```bash
   vercel env add SESSION_SECRET
   vercel env add NODE_ENV
   ```
   Enter `production` for NODE_ENV and a random string for SESSION_SECRET.

5. **Deploy:**
   ```bash
   vercel --prod
   ```

## Step 4: Verify Deployment

1. Visit your deployment URL (provided by Vercel)
2. Test the registration and login functionality
3. Check Vercel logs for any errors

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `POSTGRES_URL` | PostgreSQL connection string | Yes (auto-set by Vercel Postgres) |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `NODE_ENV` | Environment (production/development) | Recommended |

## Local Development Setup

To test locally with PostgreSQL:

1. **Install PostgreSQL locally** or use a service like Supabase/Neon

2. **Create a database:**
   ```sql
   CREATE DATABASE user_auth;
   ```

3. **Create a `.env` file:**
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/user_auth
   SESSION_SECRET=your-local-secret-key
   NODE_ENV=development
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run the server:**
   ```bash
   npm start
   ```

The database table will be created automatically on first run.

## Troubleshooting

### Database Connection Issues

- Verify `POSTGRES_URL` is set in Vercel environment variables
- Check that Vercel Postgres is linked to your project
- Review Vercel function logs for connection errors

### Session Issues

- Ensure `SESSION_SECRET` is set
- Check that cookies are enabled in your browser
- Verify HTTPS is being used (automatic on Vercel)

### Build Errors

- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (Vercel uses Node 18.x by default)
- Review build logs in Vercel dashboard

## Additional Notes

- Vercel Postgres has a free tier with limitations
- For production, consider upgrading your database plan
- Sessions are stored in memory by default - consider using Redis for production
- All routes are serverless functions on Vercel

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- PostgreSQL Docs: https://www.postgresql.org/docs/

