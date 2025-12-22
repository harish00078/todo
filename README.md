# TodoMaster - A Beautiful Todo App 🚀

A modern, feature-rich todo application built with React, Redux Toolkit, Firebase, and Tailwind CSS. Features a stunning glassmorphism UI with smooth animations.

![TodoMaster](https://img.shields.io/badge/React-18-blue) ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple) ![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

- ✅ **Add, Edit, Delete Todos** - Full CRUD operations
- 🔄 **Real-time Sync** - Firebase Firestore integration
- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- 🎯 **Filter Todos** - View All, Active, or Completed tasks
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Backend/Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Firebase account

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/macbook/Code/todo-app
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project or use an existing one
   
   c. Enable Firestore Database:
      - Go to Firestore Database
      - Click "Create database"
      - Choose "Start in test mode" (for development)
      - Select a location
   
   d. Get your Firebase configuration:
      - Go to Project Settings → General
      - Scroll to "Your apps" section
      - Click the web icon (</>) to add a web app
      - Copy the configuration object
   
   e. Update `src/firebase.ts` with your Firebase credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── AddTodo.tsx       # Add new todo form
│   │   ├── TodoItem.tsx      # Individual todo item
│   │   ├── TodoList.tsx      # List of todos
│   │   └── FilterButtons.tsx # Filter controls
│   ├── store/
│   │   ├── store.ts          # Redux store configuration
│   │   └── todosSlice.ts     # Todos slice with async thunks
│   ├── firebase.ts           # Firebase configuration
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles with Tailwind
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies
```

## 🎨 Features Breakdown

### Redux Toolkit Integration
- Centralized state management
- Async thunks for Firebase operations
- Optimistic UI updates

### Firebase Firestore
- Real-time database
- Automatic synchronization
- Scalable cloud storage

### Tailwind CSS Styling
- Custom color palette
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design utilities

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Usage

1. **Add a Todo**: Type in the input field and click "Add Todo" or press Enter
2. **Complete a Todo**: Click the circle icon to mark as complete
3. **Delete a Todo**: Hover over a todo and click the trash icon
4. **Filter Todos**: Use the filter buttons to view All, Active, or Completed todos

## 🎯 Firebase Firestore Rules

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null; // Requires authentication
      // Or for testing (NOT recommended for production):
      // allow read, write: if true;
    }
  }
}
```

## 🚨 Troubleshooting

### Firebase Connection Issues
- Ensure you've replaced the placeholder values in `src/firebase.ts`
- Check that Firestore is enabled in your Firebase project
- Verify your Firebase project's security rules

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure you're using Node.js v18 or higher

## 📄 License

MIT License - feel free to use this project for learning or personal use!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React, Redux Toolkit, Firebase & Tailwind CSS
