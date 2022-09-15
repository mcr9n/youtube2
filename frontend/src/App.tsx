import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Usuario from './pages/Usuario'
import Video from './pages/Video'
import Post from './pages/Post'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import NovoUsuario from './pages/NovoUsuario'
import NovoPost from './pages/NovoPost'
import NovoVideo from './pages/NovoVideo'

const darkTheme = createTheme({ palette: { type: 'dark' } })

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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
