import { useState, FormEvent, useEffect } from 'react'
import styled from 'styled-components'

import { useAppDispatch } from '../store/hooks'
import { asyncDeleteTodo, todoActions } from '../store/todoSlice'

interface Props {
  id: number
  content: string
  isComplete: boolean
  isNew: boolean
  createdAt: string
}

const TodoItem = function (props: Props) {
  const [beingModified, setBeingModified] = useState(false) // 현재 수정 중인지
  const [todoContentInput, setTodoContentInput] = useState(props.content) // todo 내용
  const [isNew, setIsNew] = useState(props.isNew) // 새로 생긴 todo인지
  const dispatch = useAppDispatch()

  // 새로 생긴 todo면 빈 칸으로 시작
  useEffect(() => {
    if (isNew) {
      setTodoContentInput('')
    }
  }, [isNew])

  // todo 수정 시작
  const startModifying = function () {
    // 이미 수정 중이거나 완료된 todo는 수정 허용 x
    if (beingModified || props.isComplete) {
      return
    }
    setBeingModified(true)
  }

  // todo 수정 취소
  const CancleModifying = function () {
    setBeingModified(false)
    if (isNew) {
      // 새로운 todo면 수정 취소할 시 빈 칸으로 유지
      setTodoContentInput('')
    } else {
      // 이미 있던 todo면 수정 취소할 시 기존 내용으로 유지
      setTodoContentInput(props.content)
    }
  }

  // todo 수정 완료
  const finishModifying = function (event: FormEvent) {
    event.preventDefault()
    // 빈 칸이면 경고창 띄우기
    if (!todoContentInput.trim()) {
      alert('내용을 입력해주세요')
      return
    }
    // store 내 todo 업데이트하는 함수 실행
    dispatch(todoActions.updateTodo({
      id: props.id,
      content: todoContentInput,
      isComplete: props.isComplete,
      isNew: false,
      createdAt: props.createdAt,
    }))
    setBeingModified(false)
  }

  // 미완료/완료 변경
  const changeStatus = function () {
    // 새로 생긴 todo면 입력 후 변경할 수 있도록 설정
    if (props.isNew) {
      alert('할 일을 입력해주세요.')
      return
    }
    // store 내 todo 상태 변경하는 함수 실행
    dispatch(todoActions.changeStatus({
      id: props.id,
      content: todoContentInput,
      isComplete: !props.isComplete,
      isNew: false,
      createdAt: props.createdAt,
    }))
    setIsNew(false)
  }

  // todo 입력받는 form
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

  // todo 삭제
  const deleteTodo = function () {
    dispatch(asyncDeleteTodo(props.id))
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
      <DeleteButton className="material-symbols-outlined" onClick={deleteTodo}>Delete</DeleteButton>
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
  width: 60%;
  overflow: hidden;
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

const DeleteButton = styled('span')`
  font-size: 32px;
  margin-top: 16px;
  margin-left: 32px;
  &:hover {
    cursor: pointer;
    opacity: .6;
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
    opacity: .8;
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