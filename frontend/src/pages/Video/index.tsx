import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  height: 100vh;
  font-size: 24px;
  font-weight: 600;
`
type Video = {
    id: number
    titulo: string
    duracao: number
    qualidade: number
    thumbnail: Buffer
    data_de_criacao: string
}

function Video() {
    const [videos, setVideos] = useState<Video[]>([])
  
    const columns: TableColumn<Video>[] = [
      { name: 'id', selector: (row: Video) => row.id, sortable: true },
      { name: 'titulo', selector: (row: Video) => row.titulo, sortable: true },
      { name: 'duracao', selector: (row: Video) => row.duracao, sortable: true },
      {
        name: 'data_de_criacao',
        selector: (row: Video) => row.data_de_criacao,
        sortable: true,
      },
    ]
  
    useEffect(() => {
      axios.get('http://localhost:3333/video').then(response => {
        setVideos(response.data)
      })
    }, [])
  
    useEffect(() => {
      console.log(videos)
    }, [videos])
  
    return (
      <Container>
        <h1>Video</h1>
        {videos.length > 0 && (
          <DataTable
            columns={columns}
            data={videos}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            theme="dark"
          />
        )}
      </Container>
    )
  }

export default Video