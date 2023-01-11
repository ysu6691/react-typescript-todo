import { useState, FormEvent } from 'react'
import { useAppDispatch } from '../store/hooks'
import { todoActions } from '../store/todoSlice'

interface Props {
  id: number
  content: string
  isComplete: boolean
  createdAt: string
}

const TodoItem = function (props: Props) {
  const [beingModified, setBeingModified] = useState(false)
  const [todoContentInput, setTodoContentInput] = useState(props.content)

  const dispatch = useAppDispatch()

  const startModifying = function () {
    if (beingModified) {
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
    dispatch(todoActions.updateTodo({
      id: props.id,
      content: todoContentInput,
      isComplete: props.isComplete,
      createdAt: props.createdAt,
    }))
    setBeingModified(false)
  }

  const todoForm = function () {
    return (
      <form onSubmit={finishModifying}>
        <input
          type="text"
          value={todoContentInput}
          onBlur={CancleModifying}
          onChange={(event) => { setTodoContentInput(event.target.value) }} />
      </form>
    )
  }

  return (
    <div>
      <div onClick={startModifying}>
        {beingModified ? todoForm() : props.content}
      </div>
      {props.createdAt}
    </div>
  )
}

export default TodoItem