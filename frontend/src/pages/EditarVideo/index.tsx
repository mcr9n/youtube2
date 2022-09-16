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
    titulo: string
    duracao: string
    qualidade: number
    data_de_criacao: Date
    thumbnail: File[]
  }

function EditarVideo() {
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

  const onSubmit: SubmitHandler<IFormInput> = async video => {
    const formData = new FormData()
    formData.append('titulo', video.titulo)
    formData.append('duracao', video.duracao)
    formData.append('qualidade', video.qualidade.toString())
    formData.append(
      'data_de_criacao',
      new Date(video.data_de_criacao).toISOString()
    )
    
    setLoading(true)
    await axios
      .patch(`http://localhost:3333/video/${params.id}`, video)
      .then(() => {
        toastUp('Video editado com sucesso!', 'success')
        reset()
      })
      .catch(() => {
        toastUp('Erro ao editar video!', 'error')
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
      <h1>Editar Video {params.id}</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Titulo"
          id="titulo"
          variant="filled"
          fullWidth
          {...register('titulo', { required: true })}
          error={!!errors.titulo}
        />
        <TextField
          label="Duração"
          id="Duração"
          variant="filled"
          fullWidth
          {...register('duracao', { required: true })}
          error={!!errors.duracao}
        />
        <TextField
          label="Qualidade"
          id="Qualidade"
          variant="filled"
          fullWidth
          {...register('qualidade', { required: true })}
          error={!!errors.qualidade}
        />
        <TextField
          label="Data de Criação"
          id="data_de_criacao"
          variant="filled"
          type='date'
          fullWidth
          {...register('data_de_criacao', { required: true })}
          error={!!errors.data_de_criacao}
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

export default EditarVideo
