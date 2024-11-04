import {ThemeProvider, CssBaseline} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import RegistrationForm from './pages/RegistrationForm';
import theme from './styles/theme'

const App = () => {
  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        {/* estilos basicos de materialUI */}
        <CssBaseline />  
        <RegistrationForm />
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App
