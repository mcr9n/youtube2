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
type Post = {
    id: number
    texto: string
    canal_id: number
}

function Post() {
    const [posts, setPosts] = useState<Post[]>([])
  
    const columns: TableColumn<Post>[] = [
      { name: 'id', selector: (row: Post) => row.id, sortable: true },
      { name: 'texto', selector: (row: Post) => row.texto, sortable: true },
      { name: 'canal_id', selector: (row: Post) => row.canal_id, sortable: true },
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
        <h1>Post</h1>
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