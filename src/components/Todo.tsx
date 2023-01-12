import styled from 'styled-components'

import { useAppDispatch, useAppSelector } from "../store/hooks"
import { todoActions } from "../store/todoSlice"
import TodoItem from "./TodoItem"

interface ITodo {
  id: number
  content: string
  isComplete: boolean
  isNew: boolean
  createdAt: string
}

const Todo = function () {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)
  const todoList: ITodo[] = []
  let notCompleteTodoCnt = 0
  todos.forEach((todo) => {
    if (!todo.isComplete) {
      todoList.push(todo)
      notCompleteTodoCnt += 1
    }
  })
  todos.forEach((todo) => {
    if (todo.isComplete) {
      todoList.push(todo)
    }
  })
  const todoComponents = todoList.map((todo) => {
    return <TodoItem
      key={todo.id}
      id={todo.id}
      content={todo.content}
      isComplete={todo.isComplete}
      isNew={todo.isNew}
      createdAt={todo.createdAt}
    />
  })

  return (
    <TodoMain>
      <TodoTitle>TODO LIST</TodoTitle>
      <TodoHeader>
        <span>
          미완료된 TODO 개수
        </span>
        <TodoCnt>
          {notCompleteTodoCnt}개
        </TodoCnt>
      </TodoHeader>
      <TodoContainer>
        {todoComponents}
      </TodoContainer>
      <TodoButton onClick={() => dispatch(todoActions.createTodo())}>
        +
      </TodoButton>
    </TodoMain>
  )
}

export default Todo

const TodoMain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const TodoTitle = styled.span`
  font-size: 40px;
  font-weight: bold;
  margin: 40px 40px 0;
`

const TodoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-left: 40px;
`

const TodoCnt = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const TodoContainer= styled.div`
  width: 100%;
  height: 100%;
  padding-top: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const TodoButton = styled.div`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #9747FF;
  text-align: center;
  font-size: 50px;
  line-height: 50px;
  font-weight: bold;
  color: white;
  &:hover {
    cursor: pointer;
  }
`