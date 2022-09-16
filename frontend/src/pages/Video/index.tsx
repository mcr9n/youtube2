import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Button, LinearProgress } from '@mui/material'
import Link from '../../components/Link'
import { useNavigate } from 'react-router-dom'

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
  data_de_criacao: string
}

function Video() {
  let navigate = useNavigate();
  const [videos, setVideos] = useState<VideoProps[]>([])

  const columns: TableColumn<VideoProps>[] = [
    { name: 'id', selector: (row: VideoProps) => row.id, sortable: true },
    {
      name: 'titulo',
      selector: (row: VideoProps) => row.titulo,
      sortable: true,
    },
    {
      name: 'duracao',
      selector: (row: VideoProps) => row.duracao,
      sortable: true,
    },
    {
      name: 'data_de_criacao',
      selector: (row: VideoProps) => row.data_de_criacao,
      sortable: true,
    },
    {
      name: 'likes',
      selector: (row: VideoProps) => row.likes,
      sortable: true,
    },
    {
      name: 'Ações',
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

  const handleEdit = async (id: number) => {return navigate(`/video/editar/${id}`)}

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
