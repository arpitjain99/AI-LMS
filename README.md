
# AI-Powered Learning Management System (AI LMS)

This project is an AI-powered Learning Management System (AI LMS) built using Next.js, Clerk for authentication, Inngest for function orchestration, Drizzle ORM for database interaction, and Google Gemini for AI-powered content generation. It allows users to create personalized study materials for various learning goals, such as exam preparation, job interviews, or general practice.




## Features

* **AI-Driven Course Outline Generation:** Users input a topic, course type (e.g., Exam, Job Interview, Practice, Code Prep, Other), and difficulty level.  The AI generates a course outline containing a summary, chapters, chapter summaries, topic lists for each chapter, and relevant emojis, all formatted in JSON.
* **Dynamic Study Material Generation:**  Based on the course outline, the system dynamically generates various types of study materials:
    * **Chapter Notes:** Detailed notes for each chapter, broken down by topics, in markdown format for easy rendering.
    * **Flashcards:** Interactive flashcards for memorization, with front and back content.
    * **Quizzes:** Gamified quizzes with multiple-choice questions, timers, and scoring to test knowledge.
    * **Question & Answer (Q&A):**  Comprehensive question-and-answer pairs for deeper learning.
* **Personalized Learning Paths:** Users can select the specific study material types they want to generate and use.  An "ALL" option generates all available study types.
* **User Authentication:** Clerk manages user registration, login, and secure sessions.
* **Database Integration:** Drizzle ORM facilitates interactions with a Neon Serverless PostgreSQL database, storing course data, user information, and generated study materials.
* **Background Task Orchestration:**  Inngest orchestrates the complex interactions between the AI model, database operations, and asynchronous content generation, providing a seamless user experience.
* **Progress Tracking (Generating/Ready Status):** UI elements indicate the status of material generation, providing feedback to the user while content is being created in the background.
* **Interactive Flashcard UI:** Flashcards are presented in a user-friendly swipeable interface with flip card animations.
* **Gamified Quiz Experience:** Quizzes include timers, scoring, and feedback on correct/incorrect answers, enhancing user engagement.
* **Markdown Rendering for Notes and Q&A:**  Notes and Q&A content are rendered using `react-markdown` and `remark-gfm` for a clean and formatted display.

# TutorAI - AI Learning Management System

TutorAI is an AI-powered learning management system built with Next.js. It lets users create personalized courses from any topic and automatically generates study notes, flashcards, quizzes, and question and answer material using Google Gemini.


## Tech Stack

- **Framework:** Next.js 15, React 18
- **Styling:** Tailwind CSS
- **Authentication:** Clerk
- **Database:** PostgreSQL, Neon serverless PostgreSQL
- **ORM:** Drizzle ORM, Drizzle Kit
- **AI:** Google Gemini
- **Background Jobs:** Inngest
- **UI Libraries:** Lucide React, Framer Motion, Swiper, React Card Flip
- **Markdown:** React Markdown, Remark GFM

## Prerequisites

Install or create these before running the project:

- Node.js 18 or newer
- npm
- Git
- PostgreSQL database, recommended: Neon
- Clerk account
- Google Gemini API key
- Optional: Inngest account for deployed background jobs
- Optional: YouTube Data API key if you want to replace or extend the current YouTube route behavior

## Installation Checklist

Use this quick checklist before starting development:

```bash
# 1. Install project dependencies
npm install

# 2. Push Drizzle schema to PostgreSQL
npx drizzle-kit push

# 3. Run the Next.js app
npm run dev

# 4. Run Inngest locally in another terminal
npx inngest-cli@latest dev
```

Required services:

| Service | Why it is needed |
| --- | --- |
| Node.js + npm | Runs the Next.js application and installs packages |
| PostgreSQL / Neon | Stores users, courses, notes, quizzes, flashcards, and Q&A |
| Drizzle ORM | Connects the app code to PostgreSQL tables |
| Drizzle Kit | Pushes and generates database schema migrations |
| Clerk | Handles authentication |
| Google Gemini | Generates AI course content |
| Inngest | Runs background content generation jobs |

## Full Setup Steps

### 1. Clone the repository

```bash
git clone <repository-url>
cd Ai-lms-main
```

### 2. Install Node dependencies

All required packages are already listed in `package.json`, including Next.js, Clerk, Drizzle ORM, Neon, Gemini, and Inngest.

```bash
npm install
```

This installs important packages such as:

- `next`
- `react`
- `@clerk/nextjs`
- `@neondatabase/serverless`
- `drizzle-orm`
- `drizzle-kit`
- `@google/generative-ai`
- `inngest`
- `tailwindcss`
- `daisyui`

### 3. Create a PostgreSQL database

You can use Neon PostgreSQL or any PostgreSQL database.

If PostgreSQL is installed locally, create a database manually:

```bash
createdb tutorai
```

Local PostgreSQL connection example:

```text
postgresql://postgres:your_password@localhost:5432/tutorai
```

Recommended Neon steps:

1. Go to the Neon dashboard.
2. Create a new project.
3. Create or select a database.
4. Copy the PostgreSQL connection string.
5. Use the pooled/serverless connection string if Neon provides one.

The connection string usually looks like this:

```text
postgresql://username:password@host/database?sslmode=require
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

DATABASE_URL=your_postgresql_connection_string

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3-flash-preview
```

The current code also supports these fallback variables:

```env
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=your_postgresql_connection_string
NEXT_PUBLIC_DATABASE_URL_STRING=your_postgresql_connection_string
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GEMINI_MODEL=your_gemini_model
```

For security, prefer these server-side variables:

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model
```

### 5. Set up Clerk authentication

1. Create an application in Clerk.
2. Copy the publishable key and secret key.
3. Add them to `.env.local`.
4. In Clerk, configure these local URLs if needed:

```text
http://localhost:3000/sign-in
http://localhost:3000/sign-up
http://localhost:3000/dashboard
```

The app has Clerk pages at:

```text
app/(auth)/sign-in/[[...sign-in]]/page.jsx
app/(auth)/sign-up/[[...sign-up]]/page.jsx
```

### 6. Set up Drizzle ORM

Drizzle is already installed in this project:

```bash
npm install drizzle-orm
npm install -D drizzle-kit
```

You do not need to run those commands again after `npm install`, but they are the packages used by this app.

Drizzle ORM is used in the application code, and Drizzle Kit is used from the terminal.

Main Drizzle files:

```text
configs/schema.js
configs/db.js
drizzle.config.js
drizzle/
```

Push the schema to PostgreSQL:

```bash
npx drizzle-kit push
```

Generate migration files when the schema changes:

```bash
npx drizzle-kit generate
```

Optional: open Drizzle Studio to inspect your database:

```bash
npx drizzle-kit studio
```

### 7. Set up Inngest

Inngest is used for background jobs that generate notes, flashcards, quizzes, and Q&A content.

It is already installed through `package.json`:

```bash
npm install inngest
```

If the Inngest CLI is not installed, run it directly with `npx`:

```bash
npx inngest-cli@latest dev
```

Main Inngest files:

```text
inngest/client.js
inngest/functions.js
app/api/inngest/route.js
```

For local development, first start the Next.js app:

```bash
npm run dev
```

Then open a second terminal and start the Inngest dev server:

```bash
npx inngest-cli@latest dev
```

The local Inngest dashboard will show your functions and runs. It connects to the app endpoint:

```text
http://localhost:3000/api/inngest
```

### 8. Start the development server

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

### 9. Build for production

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds the app for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js linting |
| `npx drizzle-kit push` | Pushes the Drizzle schema to PostgreSQL |
| `npx drizzle-kit generate` | Generates Drizzle migration files |
| `npx drizzle-kit studio` | Opens Drizzle Studio |
| `npx inngest-cli@latest dev` | Starts the local Inngest dev server |

## Project Structure

```text
app/
  (auth)/                    Clerk authentication pages
  api/                       API routes
  course/[courseId]/         Course pages and study material views
  create/                    Course creation page
  dashboard/                 Dashboard, profile, courses, and MathAI pages
  globals.css                Global styles
  layout.js                  Root layout
  page.js                    Landing page
  provider.js                App providers

configs/
  AiModel.js                 Gemini model setup for Inngest functions
  AiModelWrapper.js          Gemini model wrapper with retry handling
  db.js                      Neon and Drizzle database connection
  schema.js                  Database schema

drizzle/
  meta/                      Drizzle migration metadata
  0000_closed_pride.sql      SQL migration

inngest/
  client.js                  Inngest client
  functions.js               Inngest background functions

public/
  Static images, icons, logo, and sample videos
```

## Main Pages

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | User dashboard |
| `/dashboard/courses` | User course list |
| `/dashboard/profile` | User profile page |
| `/dashboard/mathai` | MathAI learning hub |
| `/create` | Create a new course |
| `/course/[courseId]` | Course overview |
| `/course/[courseId]/notes` | Chapter notes |
| `/course/[courseId]/flashcards` | Flashcards |
| `/course/[courseId]/quiz` | Quiz |
| `/course/[courseId]/qa` | Question and answer material |

## API Routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/generate-course-outline` | POST | Generates a course outline and starts study material generation |
| `/api/courses?courseId=<id>` | GET | Fetches a single course |
| `/api/courses` | POST | Fetches courses for a user |
| `/api/courses` | DELETE | Deletes a course owned by the user |
| `/api/study-type` | POST | Fetches notes, flashcards, quiz, Q&A, or all study material |
| `/api/study-type-content` | POST | Creates and triggers generation for selected study content |
| `/api/create-user` | POST | Creates or syncs a user in the database |
| `/api/youtube` | GET | Fetches related YouTube videos |
| `/api/inngest` | GET/POST/PUT | Inngest function endpoint |

## Database Tables

| Table | Purpose |
| --- | --- |
| `users` | Stores user name, email, and membership status |
| `studyMaterial` | Stores course details, outline, creator, and status |
| `chapterNotes` | Stores generated notes for course chapters |
| `studyTypeContent` | Stores generated flashcards, quizzes, and Q&A content |

## AI Generation Flow

1. User creates a course from `/create`.
2. The app sends the course topic, type, and difficulty to Gemini.
3. Gemini returns a course outline in JSON format.
4. The outline is saved in the `studyMaterial` table.
5. Inngest starts background generation for notes, flashcards, quizzes, and Q&A.
6. Generated content is saved in the database.
7. The course status updates when content is ready.

## Deployment Notes

When deploying to Vercel or another host, add these environment variables in the hosting dashboard:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3-flash-preview
```

For production Inngest:

1. Create an Inngest account.
2. Connect your deployed app.
3. Use the deployed endpoint:

```text
https://your-domain.com/api/inngest
```

## Troubleshooting

### `npm install` fails

Make sure Node.js 18 or newer is installed:

```bash
node -v
npm -v
```

### Gemini API key missing

Add this to `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Database connection error

Check that your PostgreSQL connection string is correct and available as:

```env
DATABASE_URL=your_postgresql_connection_string
```

### Drizzle cannot connect

Make sure one of these variables is set:

```text
DATABASE_URL
NEXT_PUBLIC_DATABASE_CONNECTION_STRING
NEXT_PUBLIC_DATABASE_URL_STRING
```

Then run:

```bash
npx drizzle-kit push
```

### Inngest functions are not running locally

Start both processes:

```bash
npm run dev
npx inngest-cli@latest dev
```

### Course remains in generating state

Check the Next.js and Inngest terminal logs. Common causes are Gemini quota limits, invalid API keys, JSON parsing errors, or database connection issues.
* **`CreateNewUser`**: Called on user creation event; creates a new user record in the database if one doesn't exist, syncing with Clerk.
* **`GenerateNotes`**:  Triggered by `/api/generate-course-outline`; generates detailed chapter notes using the AI and updates the course status in the database.
* **`GenerateStudyTypeContent`**:  Triggered by `/api/study-type-content`; generates content for specific study material types (flashcards, quizzes, Q&A) using the configured AI models.  Updates the status of the generated content in the database.
