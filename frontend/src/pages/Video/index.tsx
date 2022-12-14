import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Button, LinearProgress } from '@mui/material'
import Link from '../../components/Link'
import { useNavigate } from 'react-router-dom'
import { Buffer } from 'buffer'

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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`

type VideoProps = {
  id: number
  titulo: string
  duracao: number
  qualidade: number
  thumbnail: Buffer
  likes: number
  comentarios: number
  data_de_criacao: string
}

function Video() {
  const navigate = useNavigate()
  const [videos, setVideos] = useState<VideoProps[]>([])

  const columns: TableColumn<VideoProps>[] = [
    {
      id: 'id',
      name: 'id',
      selector: (row: VideoProps) => row.id,
      sortable: true,
    },
    {
      id: 'titulo',
      name: 'titulo',
      selector: (row: VideoProps) => row.titulo,
      sortable: true,
    },
    {
      id: 'duracao',
      name: 'duracao',
      selector: (row: VideoProps) => row.duracao,
      sortable: true,
    },
    {
      id: 'data_de_criacao',
      name: 'data_de_criacao',
      selector: (row: VideoProps) => row.data_de_criacao,
      sortable: true,
    },
    {
      id: 'thumbnail',
      name: 'thumbnail',
      cell: (row: VideoProps) => (
        <img src={row.thumbnail.toString()} alt="thumbnail" />
      ),
      sortable: true,
    },
    {
      id: 'likes',
      name: 'likes',
      selector: (row: VideoProps) => row.likes,
      sortable: true,
      sortFunction: (a, b) => a.likes - b.likes,
    },
    {
      id: 'comentarios',
      name: 'comentarios',
      selector: (row: VideoProps) => row.comentarios,
      sortable: true,
      sortFunction: (a, b) => a.comentarios - b.comentarios,
    },
    {
      id: 'A????es',
      name: 'A????es',
      cell: row => (
        <>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleEdit(row.id)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleDelete(row.id)}
          >
            Excluir
          </Button>
        </>
      ),
    },
  ]

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3333/video/${id}`)
    setVideos(videos.filter(video => video.id !== id))
  }

  const handleEdit = async (id: number) => {
    return navigate(`/video/editar/${id}`)
  }

  useEffect(() => {
    axios.get('http://localhost:3333/video').then(response => {
      setVideos(response.data)
    })
  }, [])

  return (
    <Container>
      <Header>
        <h1>Video</h1>
        <Link to="/video/novo">Novo Video</Link>
      </Header>

      {videos.length > 0 ? (
        <DataTable
          columns={columns}
          data={videos}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          theme="dark"
        />
      ) : (
        <div style={{ width: '100%' }}>
          <LinearProgress />
        </div>
      )}
    </Container>
  )
}

export default Video
