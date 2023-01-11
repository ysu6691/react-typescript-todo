import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: number,
  content: string,
  isComplete: boolean,
  createdAt: string,
}

interface Todos {
  todos: Todo[]
}

const initialState: Todos = {
  todos: [
    {
      id: 1,
      content: 'react',
      isComplete: false,
      createdAt: '2023-01-11 23:06'
    },
    {
      id: 2,
      content: 'typescript',
      isComplete: true,
      createdAt: '2023-01-11 23:10'
    }
  ]
}

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    createTodo(state) {
      const newTodo = 
      state.todos = []
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const newTodos = [...state.todos]
      newTodos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.content = action.payload.content
        }
      })
      state.todos = newTodos
    }
  }
})

export const todoActions = todoSlice.actions
export default todoSlice.reducer