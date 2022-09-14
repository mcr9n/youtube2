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

function NovoUsuario() {
  const [openSuccess, setOpenSuccess] = useState<boolean>(false)
  const [openFail, setOpenFail] = useState<boolean>(false)
  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    const user = { nome, email }

    if (!validateForm()) {
      setOpenFail(true)
      setTimeout(() => {
        setOpenFail(false)
      }, 3000)
      return
    }

    await axios
      .post('http://localhost:3333/usuario', user)
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
    setNome('')
    setEmail('')
  }

  const validateForm = () => {
    return nome.length > 0 && email.length > 0
  }

  return (
    <Container>
      <h1>Criar usuario</h1>

      <Form>
        <TextField
          label="Nome"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          id="standard-basic"
          variant="filled"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          Usuario criado com sucesso!
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

export default NovoUsuario
