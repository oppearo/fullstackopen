import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './reducers/store'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { red, lime } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: red,
    secondary: lime,
    error: {
      main: red.A400,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)
