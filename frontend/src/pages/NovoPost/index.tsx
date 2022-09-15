import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Button, TextareaAutosize, TextField } from '@material-ui/core'
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
const TextareaAutosizeStyled = styled(TextareaAutosize)`
  width: 100%;
    max-width: 1000px;
  `

function NovoPost() {
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [openFail, setOpenFail] = useState<boolean>(false)
    const [texto, setTexto] = useState<string>('')
    const [canal_id, setCanalId] = useState<string>('')
  
    const handleSubmit = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault()
  
      const post = {texto, canal_id}
  
      if (!validateForm()) {
        setOpenFail(true)
        setTimeout(() => {
          setOpenFail(false)
        }, 3000)
        return
      }
  
      await axios
        .post('http://localhost:3333/post', post)
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
      setTexto('')
      setCanalId('')
    }
  
    const validateForm = () => {
      return texto.length > 0 && canal_id.length > 0
    }
  
    return (
      <Container>
        <h1>Novo Post</h1>
  
        <Form>
        <TextField
            label="Texto"
            id="standard-basic"
            variant="filled"
            fullWidth
            value={texto}
            onChange={e => setTexto(e.target.value)}
          />        
        <TextField
            label="Canal Id"
            id="standard-basic"
            variant="filled"
            fullWidth
            value={canal_id}
            onChange={e => setCanalId(e.target.value)}
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
                size="large"
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
                size="large"
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
  
  export default NovoPost