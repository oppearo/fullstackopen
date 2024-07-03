import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../services/requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({
        type: 'show', 
        payload: `anecdote '${anecdote.content}' added`})
      setTimeout(() => {notificationDispatch({type: 'hide'})}, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'show', 
        payload: `too short anecdote, must have length 5 or more`})
      setTimeout(() => {notificationDispatch({type: 'hide'})}, 5000)  
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
