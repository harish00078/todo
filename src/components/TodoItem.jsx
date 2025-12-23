import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todosSlice';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className="todo-item group">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="flex-shrink-0 transition-all duration-300 hover:scale-110"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <CheckCircle2 
              size={28} 
              className="text-green-400 drop-shadow-lg animate-bounce-subtle" 
            />
          ) : (
            <Circle 
              size={28} 
              className="text-white/40 hover:text-primary-400 transition-colors" 
            />
          )}
        </button>

        <p
          className={`flex-1 text-lg transition-all duration-300 ${
            todo.completed
              ? 'line-through text-white/40'
              : 'text-white'
          }`}
        >
          {todo.text}
        </p>

        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                     text-red-400 hover:text-red-300 hover:scale-110 flex-shrink-0"
          aria-label="Delete todo"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
