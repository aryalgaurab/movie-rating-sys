# CineRate — Movie Rating System

A lightweight movie review app built with Next.js 16, Prisma 7, PostgreSQL, and Tailwind CSS.

Users can browse movies, read ratings, and submit reviews. Admin users can add new movies through a simple dashboard.

🚀 Live Site
 https://movie-rating-sys.vercel.app/

## Features

- Movie gallery with average rating and review count
- Movie detail page with review form and user review history
- Authentication with email/password
- Admin-only movie creation page
- Prisma-backed PostgreSQL database
- Server Actions + App Router

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add environment variables:

   Create a `.env` file in the project root and set at least:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/movie-rating-sys"
   ```

3. Apply Prisma migrations:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app:

   ```
   http://localhost:3000
   ```

## Admin / Pre-seeded accounts

The seed script creates an admin and regular user accounts using `password` as the password.

- Admin: `admin@admin.com`
- Users: `user1@user.com`, `user2@user.com`

## Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint
- `npm run seed` — seed the database with sample movies and users

## Folder structure

- `app/`
  - `page.tsx` — homepage movie gallery
  - `admin/page.tsx` — admin movie creation page
  - `movies/[id]/page.tsx` — movie detail and review page
  - `login/page.tsx` — login form
  - `register/page.tsx` — registration form
  - `components/` — shared UI components
- `lib/`
  - `prisma.ts` — Prisma client singleton and Postgres adapter
  - `auth.ts` — session helper and authentication utilities
  - `actions/` — server actions for auth, movie creation, and reviews
  - `validations.ts` — Zod schemas for input validation
- `prisma/`
  - `schema.prisma` — Prisma schema definitions
  - `seed.ts` — seed script for sample data
  - `migrations/` — migration history
- `app/generated/prisma/` — generated Prisma client

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma 7
- PostgreSQL
- Tailwind CSS
- bcrypt for password hashing

## Notes

- The project uses cookie-based sessions for authentication.
- Review submission is only available to signed-in users.
- Admin access is required to create new movies.

