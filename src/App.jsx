import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import { CheckSquare, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare size={48} className="text-primary-400 drop-shadow-lg" />
            <h1 className="text-6xl font-bold text-gradient">
              TodoMaster
            </h1>
            <Sparkles size={32} className="text-yellow-400 animate-bounce-subtle" />
          </div>
          <p className="text-white/70 text-lg">
            Organize your life with style ✨
          </p>
        </header>

        {/* Add Todo Form */}
        <AddTodo />

        {/* Filter Buttons */}
        <FilterButtons />

        {/* Todo List */}
        <TodoList />

        {/* Footer */}
        {/* <footer className="text-center mt-12 text-white/40 text-sm animate-fade-in">
          <p>Built with React, Redux Toolkit, Firebase & Tailwind CSS</p>
        </footer> */}
      </div>
    </div>
  );
}

export default App;
