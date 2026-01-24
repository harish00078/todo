# TodoMaster – Technical Documentation

## 1. Executive Summary
TodoMaster is a production-ready, feature-rich task management application built with modern web technologies. It combines a polished "Glassmorphism" user interface with robust backend synchronization. Unlike standard todo lists, it integrates gamification elements (particle effects) and fluid animations to enhance user engagement. The application supports full CRUD (Create, Read, Update, Delete) operations, real-time synchronization, and client-side filtering.

## 2. Technology Stack
### Core Framework
- **Runtime/Build Tool:** Vite (v5.4.21) - Ensures fast Hot Module Replacement (HMR) and optimized production builds.
- **Frontend Library:** React 18 - Utilizing functional components and Hooks (useState, useEffect, useRef).
- **Language:** JavaScript (ES Modules).

### State Management & Backend
- **State Management:** Redux Toolkit - Manages global application state, including asynchronous API calls via createAsyncThunk.
- **Backend (BaaS):** Firebase Firestore - A NoSQL cloud database for real-time data persistence.

### User Interface & Experience
- **Styling:** Tailwind CSS (v4.x) - Utility-first CSS framework.
- **Design System:** Custom "Glassmorphism" utility class (`glass-effect`).
- **Animations:** Framer Motion - Handles list reordering (AnimatePresence) and micro-interactions.
- **Visual Effects:** Canvas Confetti - Renders particle effects for user actions.
- **Icons:** Lucide React - Consistent SVG iconography.

## 3. System Architecture
### 3.1 Data Flow (Redux & Firestore)
The application uses a pessimistic update pattern to ensure data consistency. Actions are dispatched to Redux thunks, which communicate with Firebase. The UI updates only after the database operation succeeds.

**Store Location:** `src/store/todosSlice.js`

**Key Operations:**
- **fetchTodos:** Queries the todos collection, ordered by `createdAt` (descending), limited to 50 items. It includes logic to handle various timestamp formats (Firestore Timestamp, Date object, or number).
- **addTodo:** Creates a new document with `text`, `completed: false`, and a server timestamp.
- **toggleTodo:** Updates the `completed` status of a specific document.
- **deleteTodo:** Removes a document by ID.

### 3.2 Component Hierarchy
- **App.jsx:** The root layout container. Initializes the application structure and header.
- **AddTodo.jsx:** A form component for inputting new tasks. Contains validation to prevent empty submissions.
- **FilterButtons.jsx:** Displays controls for "All", "Active", and "Completed". It dynamically calculates and displays the count of tasks in each category.
- **TodoList.jsx:** The main display container. It handles loading states, error messaging (connection issues), and renders the list of `TodoItem` components wrapped in Framer Motion animations.
- **TodoItem.jsx:** Renders individual tasks. Features inline editing (swaps text for input), click-coordinate tracking for particle effects, and swipe/delete animations.

## 4. UI/UX Design Features
### 4.1 Glassmorphism Theme
The application defines a custom CSS utility class in `src/index.css` to create a consistent "frosted glass" aesthetic:
```css
@utility glass-effect {
  @apply bg-white/10 backdrop-blur-lg border border-white/20;
  @apply shadow-xl shadow-black/20;
}
```
This is applied to input fields, list items, and containers.

### 4.2 Gamification Effects
User actions trigger specific physics-based visual feedback defined in `src/utils/effects.js`:
- **Task Completion:** Triggers `triggerStars` – a burst of star-shaped gold and yellow particles.
- **Task Deletion:** Triggers `triggerFire` – a complex effect combining white core particles, orange/red flame particles, and dark smoke particles to simulate incineration.

## 5. Installation & Setup Guide
### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Firebase project

### Step-by-Step Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/harish00078/todo
   cd todo-app
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Environment Configuration**
   Create a `.env` file in the project root to store your Firebase credentials. The application expects the following VITE-prefixed variables:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. **Firebase Database Setup**
   - Navigate to the Firebase Console -> Firestore Database.
   - Create a collection named `todos`.
   - **Security Rules:** For development/testing, you may use standard read/write rules. For production, ensure `request.auth != null` is enforced.
5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

## 6. Data Model
### Todo Object Structure
```json
{
  "id": "string (Firestore Document ID)",
  "text": "string (Task description)",
  "completed": "boolean",
  "createdAt": "timestamp (Firestore Timestamp or Number)"
}
```

## 7. Troubleshooting
The application includes built-in diagnostics for common errors, primarily displayed in `TodoList.jsx`:

| Issue | Symptom | Solution |
| :--- | :--- | :--- |
| Connection Error | Red error box appears in the list area. | 1. Check internet connection.<br>2. Verify .env variables match Firebase Console.<br>3. Ensure Firestore rules allow read/write access. |
| Loading Forever | Spinner never disappears. | Often caused by strict Firestore security rules preventing the query or a network firewall. |
| Build Failures | `npm run build` fails. | Run `npm install` to ensure all dependencies (especially Tailwind/PostCSS) are correctly linked. |

## 8. Scripts Reference
Defined in `package.json`:
- **dev:** Starts the Vite development server.
- **build:** Compiles the app for production (outputs to `dist/`).
- **preview:** Locally previews the production build.
- **lint:** Runs ESLint for code quality checks.

## 9. Conclusion
TodoMaster is a modern, production-ready task management application showcasing:
- Scalable frontend architecture
- Cloud-based real-time data persistence
- Advanced UI animations
- Gamified user experience
- Clean and maintainable codebase
