const Notification = ({ message, isError }) => {
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
      {message && isError && <h3 style={errorStyle}>{`Error: ${message}`}</h3>}
      {message && !isError && <h3 style={messageStyle}>{message}</h3>}
    </div>
  )
}

export default Notification
