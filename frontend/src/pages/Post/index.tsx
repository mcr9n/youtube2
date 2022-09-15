import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DataTable, { TableColumn } from 'react-data-table-component'
import { Button, LinearProgress } from '@material-ui/core'
import Link from '../../components/Link'
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
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`
type Post = {
    id: number
    texto: string
    canal_id: number
}

function Post() {
    const [posts, setPosts] = useState<Post[]>([])
  
    const handleDelete = async (id: number) => {
      await axios.delete(`http://localhost:3333/post/${id}`)
      setPosts(posts.filter(post => post.id !== id))
    }
    const handleEdit = async (id: number) => {}

    const columns: TableColumn<Post>[] = [
      { name: 'id', selector: (row: Post) => row.id, sortable: true },
      { name: 'texto', selector: (row: Post) => row.texto, sortable: true },
      { name: 'canal_id', selector: (row: Post) => row.canal_id, sortable: true },
      {
        name: 'Ações',
        cell: row => (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEdit(row.id)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDelete(row.id)}
            >
              Excluir
            </Button>
          </>
        ),
      }
    ]
  
    useEffect(() => {
      axios.get('http://localhost:3333/post').then(response => {
        setPosts(response.data)
      })
    }, [])
  
    useEffect(() => {
      console.log(posts)
    }, [posts])
  
    return (
      <Container>
        <Header>
        <h1>Post</h1>
        <Link to="/post/novo">Novo Post</Link>
        </Header>
        {posts.length > 0 && (
          <DataTable
            columns={columns}
            data={posts}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            theme="dark"
          />
        )}
      </Container>
    )
  }

export default Post