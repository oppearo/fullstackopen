import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const isError = useSelector((state) => state.notification.error)
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div>
      {message && isError && (
        <Alert severity="error">{`Error: ${message}`}</Alert>
      )}
      {message && !isError && <Alert severity="success">{message}</Alert>}
    </div>
  )
}

export default Notification
