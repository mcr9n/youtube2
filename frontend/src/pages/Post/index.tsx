import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Button, LinearProgress } from '@mui/material'
import Link from '../../components/Link'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  font-size: 40px;
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
type PostProps = {
  id: number
  texto: string
  canal_id: number
}

function Post() {
  const [posts, setPosts] = useState<PostProps[]>([])

  const columns: TableColumn<PostProps>[] = [
    { name: 'id', selector: (row: PostProps) => row.id, sortable: true },
    { name: 'texto', selector: (row: PostProps) => row.texto, sortable: true },
    {
      name: 'canal_id',
      selector: (row: PostProps) => row.canal_id,
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
    await axios.delete(`http://localhost:3333/post/${id}`)
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleEdit = async (id: number) => {}

  useEffect(() => {
    axios.get('http://localhost:3333/post').then(response => {
      setPosts(response.data)
    })
  }, [])

  return (
    <Container>
      <Header>
        <h1>Post</h1>
        <Link to="/post/novo">Novo Post</Link>
      </Header>

      {posts.length > 0 ? (
        <DataTable
          columns={columns}
          data={posts}
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

export default Post
