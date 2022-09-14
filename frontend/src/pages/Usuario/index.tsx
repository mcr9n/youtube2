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

type User = {
  id: number
  nome: string
  email: string
  data_de_criacao: string
}

function Usuario() {
  const [users, setUsers] = useState<User[]>([])

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3333/usuario/${id}`)
    setUsers(users.filter(user => user.id !== id))
  }

  const handleEdit = async (id: number) => {}

  const columns: TableColumn<User>[] = [
    { name: 'id', selector: (row: User) => row.id, sortable: true },
    { name: 'nome', selector: (row: User) => row.nome, sortable: true },
    { name: 'email', selector: (row: User) => row.email, sortable: true },
    {
      name: 'data_de_criacao',
      selector: (row: User) => row.data_de_criacao,
      sortable: true,
    },
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
    },
  ]

  useEffect(() => {
    axios.get('http://localhost:3333/usuario').then(response => {
      setUsers(response.data)
    })
  }, [])

  return (
    <Container>
      <Header>
        <h1>Usuario</h1>
        <Link to="/usuario/novo">Novo Usuário</Link>
      </Header>

      {users.length > 0 ? (
        <DataTable
          columns={columns}
          data={users}
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

export default Usuario
