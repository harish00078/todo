import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

const initialState = {
  items: [],
  filter: 'all',
  loading: false,
  error: null,
};

// Async thunks for Firebase operations
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    // Query with server-side sorting and limit for scalability
    const q = query(
      collection(db, 'todos'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    const todos = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Robust timestamp conversion
      let createdAt = Date.now();
      if (data.createdAt) {
        if (typeof data.createdAt.toMillis === 'function') {
          createdAt = data.createdAt.toMillis();
        } else if (data.createdAt instanceof Date) {
          createdAt = data.createdAt.getTime();
        } else if (typeof data.createdAt === 'number') {
          createdAt = data.createdAt;
        }
      }

      todos.push({ 
        id: doc.id, 
        ...data,
        createdAt
      });
    });
    // Client-side sorting as a fallback
    todos.sort((a, b) => b.createdAt - a.createdAt);
    
    console.log('Fetched todos:', todos);
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (text) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        text,
        completed: false,
        createdAt: serverTimestamp(),
      });
      console.log('Added todo with ID:', docRef.id);
      return {
        id: docRef.id,
        text,
        completed: false,
        createdAt: Date.now(),
      };
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (todo) => {
    try {
      const todoRef = doc(db, 'todos', todo.id);
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
      console.log('Toggled todo:', todo.id);
      return { id: todo.id, completed: !todo.completed };
    } catch (error) {
      console.error('Error toggling todo:', error);
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      console.log('Deleted todo:', id);
      return id;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action) => {
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
