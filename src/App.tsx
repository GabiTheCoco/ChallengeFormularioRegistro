import {ThemeProvider, CssBaseline} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RegistrationForm from './pages/RegistrationForm';
import theme from './styles/theme'

// import { useState } from 'react'
// import './App.css'

const App = () => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        {/* estilos basicos de materialUI */}
        <CssBaseline />  
        <RegistrationForm />
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App
