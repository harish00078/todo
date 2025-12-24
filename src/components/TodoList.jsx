import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todosSlice';
import TodoItem from './TodoItem';
import { Loader2, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, filter, loading, error } = useSelector(
    (state) => state.todos
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
      <div className="bg-red-500/20 border border-red-500 rounded-2xl p-8 text-center animate-fade-in my-4">
        <h3 className="text-red-400 text-xl font-bold mb-2">Connection Error</h3>
        <p className="text-white text-lg mb-4">{error}</p>
        <div className="text-white/60 text-sm bg-black/30 p-4 rounded text-left font-mono overflow-auto">
          <p>Possible causes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Firebase configuration is invalid or expired.</li>
            <li>Firestore database does not exist or has strict security rules.</li>
            <li>Network connectivity issues.</li>
          </ul>
          <p className="mt-4 text-yellow-400">Check the browser console (F12) for detailed error logs.</p>
        </div>
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
    <motion.div className="space-y-3" layout>
      <AnimatePresence mode="popLayout" initial={false}>
        {filteredTodos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              x: -100,
              transition: { duration: 0.2 } 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <TodoItem todo={todo} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;
