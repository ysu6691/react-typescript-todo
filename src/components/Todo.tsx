import { useAppDispatch, useAppSelector } from "../store/hooks"
import { todoActions } from "../store/todoSlice"
import TodoItem from "./TodoItem"

const Todo = function () {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)
  const todoList = todos.map((todo) => {
    return <TodoItem
      key={todo.id}
      id={todo.id}
      content={todo.content}
      isComplete={todo.isComplete}
      createdAt={todo.createdAt}
    />
  })

  return (
    <div>
      <h1>TODO LIST</h1>
      <div>
        미완료된 TODO 개수
      </div>
      <div>
        3개
      </div>
      <>
        {todoList}
      </>
      <button onClick={() => dispatch(todoActions.createTodo())}>+</button>
    </div>
  )
}

export default Todo