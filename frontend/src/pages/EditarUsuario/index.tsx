import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { CircularProgress, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Toast from '../../components/Toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

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

interface IFormInput {
  nome: string
  email: string
}

function EditarUsuario() {
  let params = useParams()

    
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>()

  const [loading, setLoading] = useState<boolean>(false)
  const [openToast, setOpenToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
    'success'
  )

  const onSubmit: SubmitHandler<IFormInput> = async usuario => {
    setLoading(true)
    await axios
      .patch(`http://localhost:3333/usuario/${params.id}`, usuario)
      .then(() => {
        toastUp('Usuario editado com sucesso!', 'success')
        reset()
      })
      .catch(() => {
        toastUp('Erro ao editar usuario!', 'error')
      })
    setLoading(false)
  }

  const toastUp = (message: string, severity: 'success' | 'error') => {
    setOpenToast(true)
    setToastMessage(message)
    setToastSeverity(severity)
  }

  return (
    <Container>
      <h1>Editar Usuario {params.id}</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome"
          id="nome"
          variant="filled"
          fullWidth
          {...register('nome', { required: true })}
          error={!!errors.nome}
        />
        <TextField
          label="Email"
          id="email"
          variant="filled"
          fullWidth
          {...register('email', { required: true })}
          error={!!errors.email}
        />

        <LoadingButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ width: '100%', maxWidth: 300 }}
          loading={loading}
          loadingIndicator={<CircularProgress color="primary" size={16} />}
        >
          Editar
        </LoadingButton>
      </Form>

      <Toast
        message={toastMessage}
        open={openToast}
        setOpen={setOpenToast}
        severity={toastSeverity}
      />
    </Container>
  )
}

export default EditarUsuario
