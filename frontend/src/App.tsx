import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Usuario from './pages/Usuario'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

const darkTheme = createTheme({ palette: { type: 'light' } })

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
