import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('add', content)
        dispatch(addAnecdote(content))
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