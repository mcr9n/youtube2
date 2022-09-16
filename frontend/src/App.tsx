import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Usuario from './pages/Usuario'
import Video from './pages/Video'
import Post from './pages/Post'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import NovoUsuario from './pages/NovoUsuario'
import NovoPost from './pages/NovoPost'
import NovoVideo from './pages/NovoVideo'
import EditarPost from './pages/EditarPost'
import EditarUsuario from './pages/EditarUsuario'
import EditarVideo from './pages/EditarVideo'

const darkTheme = createTheme({
  palette: { mode: 'dark', background: { default: '#121212' } },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/video" element={<Video />} />
          <Route path="/post" element={<Post />} />
          <Route path="/usuario/novo" element={<NovoUsuario />} />
          <Route path="/post/novo" element={<NovoPost />} />
          <Route path="/video/novo" element={<NovoVideo />} />
          <Route path="/post/editar/:id" element={<EditarPost />} />
          <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
          <Route path="/video/editar/:id" element={<EditarVideo />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
