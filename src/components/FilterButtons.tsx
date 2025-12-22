import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/todosSlice';
import type { RootState } from '../store/store';
import { ListTodo, CheckCircle, Circle } from 'lucide-react';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.todos.filter);
  const todos = useSelector((state: RootState) => state.todos.items);

  const filters = [
    { value: 'all' as const, label: 'All', icon: ListTodo, count: todos.length },
    { 
      value: 'active' as const, 
      label: 'Active', 
      icon: Circle, 
      count: todos.filter(t => !t.completed).length 
    },
    { 
      value: 'completed' as const, 
      label: 'Completed', 
      icon: CheckCircle, 
      count: todos.filter(t => t.completed).length 
    },
  ];

  return (
    <div className="glass-effect rounded-2xl p-4 mb-6 animate-fade-in">
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map(({ value, label, icon: Icon, count }) => (
          <button
            key={value}
            onClick={() => dispatch(setFilter(value))}
            className={`filter-btn ${
              currentFilter === value ? 'filter-btn-active' : 'filter-btn-inactive'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon size={18} />
              <span>{label}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                {count}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons;
