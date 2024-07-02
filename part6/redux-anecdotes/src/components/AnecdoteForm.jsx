import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('add', content)
        dispatch(createAnecdote(content))
        event.target.anecdote.value = ''
    }

    return (
      <form onSubmit={add}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    )
}

export default AnecdoteForm