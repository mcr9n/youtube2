import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core'
import { Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@material-ui/icons/Close'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  font-size: 24px;
  font-weight: 600;
  padding: 40px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 550px;
`

// type User = {
//   id: number
//   nome: string
//   email: string
//   data_de_criacao: string
// }

function NovoVideo() {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)
  const [titulo, setTitulo] = useState<string>('')
  const [duracao, setDuracao] = useState<string>('')
  const [qualidade, setQualidade] = useState<string>('')
  const [dataDeCriacao, setDataDeCriacao] = useState<string>('')
  const [thumbnail, setThumbnail] = useState<string>('')

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    const video = { titulo, duracao, qualidade, dataDeCriacao, thumbnail }

    await axios
      .post('http://localhost:3333/video', video)
      .then(() => {
        setOpenSuccess(true)
        resetForm()
        setTimeout(() => {
          setOpenSuccess(false)
        }, 3000)
      })
      .catch(() => {
        setOpenFail(false)
      })
  }

  const resetForm = () => {
    setTitulo('')
    setDuracao('')
    setQualidade('')
    setDataDeCriacao('')
    setThumbnail('')
  }

  return (
    <Container>
      <h1>Criar video</h1>

      <Form>
        <TextField
          label="Titulo"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <TextField
          label="Duração"
          type="email"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={duracao}
          onChange={e => setDuracao(e.target.value)}
        />
        <TextField
          label="Qualidade"
          type="email"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={qualidade}
          onChange={e => setQualidade(e.target.value)}
        />
        <TextField
          label="Data de Criação"
          type="email"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={dataDeCriacao}
          onChange={e => setDataDeCriacao(e.target.value)}
        />
        <TextField
          label="Thumbnail"
          type="email"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: '100%', maxWidth: 300 }}
          onClick={e => handleSubmit(e)}
        >
          Criar
        </Button>
      </Form>

      <Collapse in={openSuccess}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenSuccess(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Video criado com sucesso!
        </Alert>
      </Collapse>

      <Collapse in={openFail}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenFail(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Algo deu errado!
        </Alert>
      </Collapse>
    </Container>
  )
}

export default NovoVideo
