# TodoMaster 🚀

**TodoMaster** is a modern, feature-rich task management application built with the latest React ecosystem. It combines a stunning "Glassmorphism" UI with robust real-time synchronization via Firebase Firestore. Beyond simple task tracking, it gamifies productivity with satisfying particle effects and fluid animations.

![React](https://img.shields.io/badge/React-18-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple) ![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan) ![Vite](https://img.shields.io/badge/Vite-Fast-yellow)

## ✨ Key Features

* **Real-Time Synchronization**: Instantly syncs tasks across devices using **Firebase Firestore**.
* **Gamified Experience**:
    * **Completion**: Triggers a "Star Burst" confetti explosion when tasks are checked off.
    * **Deletion**: Triggers a "Fire & Smoke" effect when tasks are removed.
* **Glassmorphism Design**: Features a consistent frosted-glass aesthetic with backdrop blurs and translucent layers.
* **Full CRUD Operations**:
    * **Create**: Add tasks with input validation.
    * **Read**: View tasks sorted by creation time.
    * **Update**: Edit text inline and toggle completion status.
    * **Delete**: Permanently remove tasks.
* **Smart Filtering**: Filter tasks by **All**, **Active**, or **Completed** statuses.
* **Fluid Animations**: Smooth layout transitions powered by **Framer Motion**.

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite
* **State Management**: Redux Toolkit (Async Thunks)
* **Backend / Database**: Google Firebase Firestore
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion, Canvas Confetti
* **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn
* A Firebase project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/harish00078/todo
    cd todo
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    Create a `.env` file in the root directory and add your Firebase configuration keys. You can find these in your Firebase Console under **Project Settings**.

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```text
src/
├── components/
│   ├── AddTodo.jsx        # Input form with validation
│   ├── FilterButtons.jsx  # Status filters (All/Active/Completed)
│   ├── TodoItem.jsx       # Individual task with inline editing
│   └── TodoList.jsx       # Main list container with animations
├── store/
│   ├── store.js           # Redux store configuration
│   └── todosSlice.js      # Redux logic & Firestore thunks
├── utils/
│   └── effects.js         # Confetti particle configurations
├── App.jsx                # Main layout
├── firebase.js            # Firebase initialization
├── index.css              # Tailwind & Glassmorphism styles
└── main.jsx               # Entry point
```

## 📝 Usage Guide

* **Add a Task**: Type your task in the input field and press Enter or click the "+" button.
* **Edit a Task**: Click the **Pencil** icon on any task to switch to edit mode. Press Enter to save.
* **Complete a Task**: Click the **Circle** icon. Watch the star burst effect!
* **Delete a Task**: Click the **Trash** icon. Watch the fire effect!
* **Filter**: Use the buttons above the list to filter by status.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.