import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any;
}

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  loading: false,
  error: null,
};

// Async thunks for Firebase operations
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const todos: Todo[] = [];
  querySnapshot.forEach((doc) => {
    todos.push({ id: doc.id, ...doc.data() } as Todo);
  });
  return todos;
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (text: string) => {
    const docRef = await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
    });
    return {
      id: docRef.id,
      text,
      completed: false,
      createdAt: new Date(),
    };
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (todo: Todo) => {
    const todoRef = doc(db, 'todos', todo.id);
    await updateDoc(todoRef, {
      completed: !todo.completed,
    });
    return { id: todo.id, completed: !todo.completed };
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Add todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add todo';
      })
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.items.find((t) => t.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;
