import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todosSlice';
import type { RootState, AppDispatch } from '../store/store';
import TodoItem from './TodoItem';
import { Loader2, Inbox } from 'lucide-react';

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filter, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = items.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading && items.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in">
        <Loader2 className="animate-spin mx-auto mb-4 text-primary-400" size={48} />
        <p className="text-white/60 text-lg">Loading your todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect rounded-2xl p-8 text-center animate-fade-in">
        <p className="text-red-400 text-lg">⚠️ {error}</p>
        <p className="text-white/60 mt-2">
          Make sure to configure your Firebase credentials in src/firebase.ts
        </p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="glass-effect rounded-2xl p-12 text-center animate-fade-in">
        <Inbox className="mx-auto mb-4 text-white/30" size={64} />
        <p className="text-white/60 text-xl">
          {items.length === 0
            ? 'No todos yet. Add one to get started! 🚀'
            : `No ${filter} todos`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
