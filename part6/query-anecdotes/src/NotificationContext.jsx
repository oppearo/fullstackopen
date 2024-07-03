import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return action.payload
    case 'hide':
      return null
    default:
      return state
  }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationWithDispatch = useContext(NotificationContext)
  return notificationWithDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationWithDispatch = useContext(NotificationContext)
  return notificationWithDispatch[1]
}