# Prompt

## Context and Role

You are a Senior Full-Stack Software Engineer specializing in AI-powered educational platforms, scalable SaaS applications, and modern UI systems.

Your task is to design and develop a COMPLETE production-ready AI-Powered Learning Management System (LMS) that helps students generate personalized study materials using AI.

The application must be scalable, modular, responsive, secure, and optimized for real-world production deployment.

--------------------------------------------------

## Objective

Build a complete full-stack AI-powered LMS platform that includes:

• Implements secure user authentication, session persistence, and protected routes.
• Provides a modern, responsive UI with smooth transitions and a premium dark theme.
• Includes a multi-step course creation flow generating outlines, notes, flashcards, quizzes, and Q&A using Google Gemini AI.
• Processes long-running AI content generation safely in the background using Inngest.
• Give YouTube recommendations based on generated course topics.
• Logs user data, courses, and generated materials securely in a Neon PostgreSQL database.
• The system must support asynchronous AI content generation using background jobs while maintaining excellent UX and performance.

--------------------------------------------------

## Technology Stack

### Frontend
- Next.js App Router
- React.js
- JavaScript
- Tailwind CSS
- Swiper.js
- React Markdown
- remark-gfm
- Lucide React

### Backend
- Next.js API Routes
- Node.js

### Database
- Neon PostgreSQL
- Drizzle ORM

### Authentication & Background Jobs
- Clerk Authentication
- Inngest

### AI Integration
- Google Gemini AI

### Configuration
- Environment variables (.env)

--------------------------------------------------

## Folder Structure

Use scalable modular architecture:

project-root/

├── app/
├── configs/
├── drizzle/
├── inngest/
├── public/
├── components/
├── lib/
├── hooks/
├── utils/
├── middleware.js
├── package.json
└── README.md

--------------------------------------------------

## Core Features

### 1. Authentication
- Signup/Login/Logout
- Session persistence
- Protected routes
- User profile
- User-specific course access
- Auto-create users in database

Protected routes:
- /dashboard
- /create
- /course/*
- /profile

--------------------------------------------------

### 2. Landing Page

Create a modern landing page with:
- Hero section
- CTA buttons
- Feature showcase
- Smooth animations
- Dark premium UI
- Glassmorphism design
- Responsive layout

--------------------------------------------------

### 3. Dashboard

Build a dashboard with:
- Sidebar navigation
- Course list
- Progress tracking
- Recent activity
- Statistics cards
- Search UI
- Loading and empty states

--------------------------------------------------

### 4. Course Creation

Create a multi-step course creation flow.

Study Types:
- Exam
- Practice
- Job Interview
- Code Prep
- Other

Difficulty Levels:
- Easy
- Moderate
- Hard

Users can provide:
- Topic
- Subject
- Optional pasted content

On submit:
- Generate course ID
- Save course in database
- Trigger AI generation
- Redirect to dashboard
- Show generation progress

--------------------------------------------------

### 5. AI Course Outline Generation

Use Gemini AI to generate:
- Course title
- Course summary
- Chapters
- Chapter summaries
- Topics
- Emojis/icons

Implement:
- Safe JSON parsing
- Retry logic
- Exponential backoff
- Invalid response handling

--------------------------------------------------

### 6. AI Study Material System

Generate AI-powered:
- Notes
- Flashcards
- Quizzes
- Q&A practice

Features:
- Markdown notes
- Flashcard slider with animations
- MCQ quizzes with timer and score tracking
- Q&A with show/hide answers
- Chapter navigation
- Progress tracking
- Loading, empty, and error states

Store all generated content in the database.

--------------------------------------------------

### 7. AI Video Recommendations

Do NOT use YouTube API.

Use Gemini AI to recommend relevant YouTube learning videos based on course topics and display them on the course page.

--------------------------------------------------

### 8. Course Detail Page

Include:
- Course intro card
- Course summary
- Chapter list
- Material status
- Study material cards
- AI video recommendations

Materials:
- Notes
- Flashcards
- Quiz
- Q&A

--------------------------------------------------

### 9. UI/UX Requirements

Create a premium SaaS-style UI using:
- Dark theme
- Glassmorphism
- Gradient buttons
- Rounded corners
- Responsive grids
- Smooth animations
- Clean typography
- Skeleton loaders
- Animated loading states

Ensure:
- Accessibility
- Mobile responsiveness
- Performance optimization

--------------------------------------------------

### 10. Database & API System

Use Neon PostgreSQL with Drizzle ORM.

Required tables:
- users
- studyMaterial
- chapterNotes
- studyTypeContent

Create API routes for:
- /api/create-user
- /api/courses
- /api/generate-course-outline
- /api/study-type
- /api/study-type-content
- /api/youtube
- /api/inngest

Use:
- Validation
- Structured JSON responses
- Error handling
- Secure API handling

--------------------------------------------------

### 11. Background Jobs & AI Wrapper

Use Inngest for:
- Notes generation
- Flashcards generation
- Quiz generation
- Q&A generation
- Long AI tasks

Create reusable AI utilities supporting:
- sendMessage()
- Retry on 429 errors
- Exponential backoff
- Safe JSON parsing
- Fallback handling

--------------------------------------------------

### 12. Data Processing

Implement:
- Safe AI response parsing
- Structured JSON validation
- Fallback parsing for invalid responses
- Partial content generation
- Retry-safe background processing
- Input validation and sanitization
- Consistent database storage handling

--------------------------------------------------

### 13. Security & Error Handling

Implement:
- Clerk authentication
- Protected routes
- Secure environment variables
- User ownership validation
- Secure database access

Handle:
- Authentication errors
- API failures
- Database failures
- AI generation failures
- Invalid JSON responses
- Missing study materials
- Background job failures

Frontend should show:
- Friendly error states
- Recovery UI
- Retry actions



### 14. Code Standards

- Use functional React components
- Use async/await
- Use reusable components and utilities
- Keep frontend/backend logic separated
- Use modular architecture
- Validate inputs
- Handle errors properly

Strict Rules:
- Do NOT use TypeScript
- Do NOT use inline comments
- Do NOT leave placeholders or TODOs
- Generate complete production-ready code

### 15. Generation Rules

IMPORTANT:
- Generate complete code for every file
- Generate all files one by one
- Never skip implementation details
- Ensure imports and dependencies are correct
- Ensure APIs and database queries work properly
- Ensure the project runs without syntax errors
- Complete one module before moving to the next
- Do not stop until the entire application is completed
