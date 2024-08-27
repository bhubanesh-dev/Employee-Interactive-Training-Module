# Project Documentation: Employee Interactive Training Module

## 1. Project Overview

### 1.1. Project Description

The Employee Interactive Training Module is a full-stack application designed to facilitate employee training through structured video content. The application ensures that employees watch training videos in sequence without skipping or fast-forwarding, tracks their progress, and allows them to resume videos from where they left off.

### 1.2. Features

1. **Video Library**: A comprehensive list of video topics, each containing unique video content.
2. **Sequential Video Playback**: Employees must watch videos in a specific order, preventing them from skipping ahead or fast-forwarding.
3. **Resume from Last Stop**: If a video is paused or playback is interrupted, it resumes from the last watched timestamp.
4. **Back Navigation**: Users can navigate back to previously watched videos but are restricted from fast-forwarding.
5. **Progress Tracking**: The dashboard displays the employee’s completion percentage.

## 2. Technology Stack

### 2.1. Frontend

- **React.js**: Used for building the interactive user interface.
- **React Router DOM**: Enables routing and navigation within the app.
- **React Player**: Used to handle video playback functionality.
- **React Toastify**: Provides notification alerts (e.g., success, error messages).
- **Universal Cookie**: Manages cookies for handling user authentication and session.
- **JWT-Decode**: Decodes JWT tokens for managing authentication state.
- **HTML5 & CSS3**: Used for structuring and styling the user interface.

### 2.2. Backend

- **Node.js with Express.js**: Handles the server-side logic and API endpoints.
- **MongoDB with Mongoose**: Manages video metadata, user information, and progress tracking.
- **JWT (JSON Web Token)**: Used for user authentication and authorization.
- **bcryptjs**: Handles password hashing and comparison for secure authentication.
- **Cookie Parser**: Parses cookies for handling sessions and user state.
- **Cors**: Enables cross-origin resource sharing between the frontend and backend.
- **Dotenv**: Loads environment variables from a `.env` file.
- **Nodemon**: Facilitates automatic server restarts during development.

## 3. Project Structure

### 3.1. Frontend Structure

### 3.2. Backend Structure

## 4. Detailed Feature Explanation

### 4.1. Video Library

- The video library displays a list of video topics, each associated with unique video files.
- Videos are listed in order, and employees can only access the next video after completing the current one.

### 4.2. Sequential Video Playback

- Video playback is controlled to prevent fast-forwarding and skipping.
- Logic is implemented using the `react-player` library along with custom functions to restrict controls.

### 4.3. Resume from Last Stop

- The last-watched timestamp is stored in the database.
- On loading a video, the frontend fetches this timestamp and starts playback from that point.

### 4.4. Back Navigation

- Employees can navigate back to previously completed videos but are still restricted from fast-forwarding.

### 4.5. Progress Tracking

- Employee progress is calculated based on the number of videos completed out of the total.
- This percentage is displayed on the dashboard and updated in real time.

## 5. Database Schema

### 5.1. User Schema

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: { type: Number, default: 0 }, // Percentage of completed training
  watchedVideos: [{ videoId: String, watchedUntil: Number }], // Stores watched timestamp for each video
});
```

### 5.2. Video Schema

```javascript
const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true }, // URL path to the video file
  order: { type: Number, required: true }, // Order for sequential playback
});
```

## 6. API Endpoints

### 6.1. Authentication Routes

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user and return a JWT token.
- **GET /api/auth/logout**: Log out a user and clear cookies.

### 6.2. Video Routes

- **GET /api/videos**: Get the list of videos in the specified order.
- **GET /api/videos/:id**: Get specific video details by ID.
- **POST /api/videos/progress**: Update user progress based on video completion.

## 7. Frontend Workflow

### 7.1. Navigation

- **React Router DOM** is used to handle routes like `/login`, `/dashboard`, and `/videos/:id`.
- The `PrivateRoute` component ensures protected routes are only accessible to authenticated users.

### 7.2. Video Playback Logic

- `react-player` handles video playback, while custom event listeners track playback progress.
- Video control functions restrict fast-forwarding using the player's event API.

## 8. Backend Logic

### 8.1. Authentication

- Users authenticate via JWT tokens. Tokens are stored in cookies, and `cookie-parser` is used to manage these cookies.
- Passwords are hashed with `bcryptjs` before storing them in the database.

### 8.2. Progress Tracking

- Progress is stored in the user’s profile and updated when a video is completed.
- The backend tracks the last-watched timestamp and sends it to the frontend when the video is reloaded.

## 9. Deployment & Environment

### 9.1. Environment Variables

- **.env File**: Stores sensitive data like database URIs, JWT secret, and other environment-specific settings.

### 9.2. Deployment

- The frontend can be built and deployed using services like Vercel or Netlify.
- The backend can be deployed on platforms like Heroku, Render, or any cloud service (e.g., AWS, DigitalOcean).
