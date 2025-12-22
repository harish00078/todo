import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todosSlice';
import type { AppDispatch } from '../store/store';
import { Plus } from 'lucide-react';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-fade-in">
      <div className="glass-effect rounded-2xl p-6 shadow-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done? ✨"
            className="input-field flex-1 text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            disabled={!text.trim()}
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Todo</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
