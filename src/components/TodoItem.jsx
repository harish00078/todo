import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../store/todosSlice';
import { Trash2, CheckCircle2, Circle, Calendar, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerStars, triggerFire } from '../utils/effects';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const getNormalizedCoordinates = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    return { x, y };
  };

  const handleToggle = async (e) => {
    if (!todo.completed) {
      const { x, y } = getNormalizedCoordinates(e);
      triggerStars(x, y);
    }

    try {
      await dispatch(toggleTodo(todo)).unwrap();
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleDelete = async (e) => {
    if (!todo.completed) {
      const { x, y } = getNormalizedCoordinates(e);
      triggerFire(x, y);
    }

    try {
      await dispatch(deleteTodo(todo.id)).unwrap();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleUpdate = async () => {
    if (editText.trim() !== '' && editText !== todo.text) {
      try {
        await dispatch(updateTodo({ id: todo.id, text: editText })).unwrap();
        setIsEditing(false);
      } catch (err) {
        console.error('Failed to update todo:', err);
      }
    } else {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(todo.createdAt));

  return (
    <div className="todo-item group relative overflow-hidden">
      <motion.div
        initial={false}
        animate={{
          width: todo.completed ? "100%" : "0%"
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute left-0 top-0 bottom-0 bg-green-500/10 pointer-events-none"
      />

      <div className="flex items-center gap-4 relative z-10">
        <button
          onClick={handleToggle}
          className="flex-shrink-0 focus:outline-none"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <motion.div
            initial={false}
            animate={{
              scale: todo.completed ? [1, 1.2, 1] : 1,
              rotate: todo.completed ? [0, 15, -15, 0] : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {todo.completed ? (
              <CheckCircle2 
                size={28} 
                className="text-green-400 drop-shadow-lg" 
              />
            ) : (
              <Circle 
                size={28} 
                className="text-white/40 hover:text-primary-400 transition-colors" 
              />
            )}
          </motion.div>
        </button>

        <div className="flex-1 flex flex-col gap-1">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={handleKeyDown}
              className="text-lg bg-white/10 text-white rounded px-2 py-0.5 outline-none focus:ring-2 focus:ring-primary-400 w-full"
            />
          ) : (
            <p
              className={`text-lg transition-all duration-300 ${
                todo.completed
                  ? 'line-through text-white/40'
                  : 'text-white'
              }`}
            >
              {todo.text}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-white/30">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {!todo.completed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300 hover:scale-110 transition-all duration-300"
              aria-label="Edit todo"
            >
              <Pencil size={20} />
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300"
            aria-label="Delete todo"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
