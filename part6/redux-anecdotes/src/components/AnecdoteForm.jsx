import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      console.log('add', content)
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(showNotification(`you added a new anecdote: '${content}'`))
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