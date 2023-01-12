import { useState, FormEvent } from 'react'
import styled from 'styled-components'

import { useAppDispatch } from '../store/hooks'
import { todoActions } from '../store/todoSlice'

interface Props {
  id: number
  content: string
  isComplete: boolean
  isNew: boolean
  createdAt: string
}

const TodoItem = function (props: Props) {
  const [beingModified, setBeingModified] = useState(false)
  const [todoContentInput, setTodoContentInput] = useState(props.content)

  const dispatch = useAppDispatch()

  const startModifying = function () {
    if (beingModified || props.isComplete) {
      return
    }
    setBeingModified(true)
  }

  const CancleModifying = function () {
    setBeingModified(false)
    setTodoContentInput(props.content)
  }

  const finishModifying = function (event: FormEvent) {
    event.preventDefault()
    if (!todoContentInput.trim()) {
      alert('내용을 입력해주세요')
      return
    }
    dispatch(todoActions.updateTodo({
      id: props.id,
      content: todoContentInput,
      isComplete: props.isComplete,
      isNew: false,
      createdAt: props.createdAt,
    }))
    setBeingModified(false)
  }

  const changeStatus = function () {
    if (props.isNew) {
      alert('할 일을 입력해주세요.')
      return
    }
    dispatch(todoActions.changeStatus({
      id: props.id,
      content: todoContentInput,
      isComplete: !props.isComplete,
      isNew: false,
      createdAt: props.createdAt,
    }))
  }

  const todoForm = function () {
    return (
      <TodoForm onSubmit={finishModifying}>
        <TodoInput
          type="text"
          value={todoContentInput}
          placeholder='할 일을 입력해주세요.'
          onBlur={CancleModifying}
          onChange={(event) => { setTodoContentInput(event.target.value) }} 
          autoFocus
          />
      </TodoForm>
    )
  }

  return (
    <TodoItemCard>
      <TodoItemCardText>
        <div>
          <span>{props.createdAt}</span>
          {props.isNew ? <TodoItemNew>new!</TodoItemNew> : ''}
        </div>
        {beingModified ? todoForm() : <Content onClick={startModifying} isComplete={props.isComplete} isNew={props.isNew}>{props.content}</Content>}
      </TodoItemCardText>
      <CheckboxContainer onClick={changeStatus}>
        <CheckboxInner isComplete={props.isComplete} />
      </CheckboxContainer>
    </TodoItemCard>
  )
}

export default TodoItem

const TodoItemCard = styled.div`
  margin-left: 8px;
  margin-bottom: 24px;
  padding: 24px;
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
`

const TodoItemCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TodoItemNew = styled.span`
  color: red;
  margin-left: 8px;
`

const Content = styled('span')<{isComplete: boolean, isNew: boolean}>`
  color: ${props => props.isComplete || props.isNew ? '#D9D9D9' : 'black'};
  text-decoration: ${props => props.isComplete ? 'line-through' : false};
  font-size: 24px;
  font-weight: bold;
  &:hover {
    cursor: ${props => props.isComplete ? false : 'pointer'};
  }
`

const CheckboxContainer = styled('div')`
  width: 40px;
  height: 40px;
  margin-top: 16px;
  padding: 8px;
  background: #D9D9D9;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`

const CheckboxInner = styled('div')<{isComplete: boolean}>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => props.isComplete ? '#9747FF' : ''};
`

const TodoForm = styled('form')`
  width: 100%;
`

const TodoInput = styled('input')`
  padding: 8px;
  border-bottom: 2px solid #D9D9D9;
  border-radius: 4px;
`