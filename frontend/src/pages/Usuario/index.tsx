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

type User = {
  id: number
  nome: string
  email: string
  data_de_criacao: string
}

function Usuario() {
  const [users, setUsers] = useState<User[]>([])

  const columns: TableColumn<User>[] = [
    { name: 'id', selector: (row: User) => row.id, sortable: true },
    { name: 'nome', selector: (row: User) => row.nome, sortable: true },
    { name: 'email', selector: (row: User) => row.email, sortable: true },
    {
      name: 'data_de_criacao',
      selector: (row: User) => row.data_de_criacao,
      sortable: true,
    },
  ]

  useEffect(() => {
    axios.get('http://localhost:3333/usuario').then(response => {
      setUsers(response.data)
    })
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <Container>
      <h1>Usuario</h1>
      {users.length > 0 && (
        <DataTable
          columns={columns}
          data={users}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      )}
    </Container>
  )
}

export default Usuario
