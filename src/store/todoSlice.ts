import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const asyncDeleteTodo = createAsyncThunk(
  'todoSlice/asyncDeleteTodo',
  async (todoId: number) => {
    function asyncFunction () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('')
        }, 300)
      })
    }
    await asyncFunction()
    return todoId
  }
)


interface Todo {
  id: number,
  content: string,
  isComplete: boolean,
  isNew: boolean,
  createdAt: string,
}

interface Todos {
  id: number
  todos: Todo[]
}

const initialState: Todos = {
  id: 1,
  todos: [],
}

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    createTodo(state) {
      const HavingNewTodo = state.todos.some((todo) => {
        return todo.isNew
      })
      if (HavingNewTodo) {
        alert('새로운 할 일을 입력해주세요.')
        return
      }
      const today = new Date()
      const newTodo = {
        id: state.id,
        content: '새로운 TODO',
        isComplete: false,
        isNew: true,
        createdAt: today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate() + ' ' + today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0')
      }
      state.todos = [newTodo, ...state.todos]
      state.id += 1
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const newTodos = [...state.todos]
      newTodos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.content = action.payload.content
          todo.isNew = false
        }
      })
      state.todos = newTodos
    },
    changeStatus(state, action: PayloadAction<Todo>) {
      const newTodos = [...state.todos]
      newTodos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.isComplete = action.payload.isComplete
        }
      })
      state.todos = newTodos
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncDeleteTodo.pending, (state, action) => {
      alert('삭제되었습니다.')
    })
    builder.addCase(asyncDeleteTodo.fulfilled, (state, action) => {
      const newTodos = [...state.todos]
      const targetTodo = newTodos.find((todo) => {
        return todo.id === action.payload
      })
      if (targetTodo !== undefined) {
        const idx = newTodos.indexOf(targetTodo)
        newTodos.splice(idx, 1)
      }
      state.todos = newTodos
    })
  }
})

export const todoActions = todoSlice.actions
export { asyncDeleteTodo }
export default todoSlice.reducer