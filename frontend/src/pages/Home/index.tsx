import styled from 'styled-components'
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

function Home() {
  return (
    <Container>
      <h1>Tabelas</h1>
      <Link to="/usuario">Usuario</Link>
      <Link to="/video">Video</Link>
      <Link to="/canal">Canal</Link>
    </Container>
  )
}

export default Home
