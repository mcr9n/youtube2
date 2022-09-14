import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background-color: black;

  font-size: 24px;
  text-decoration: none;
  color: white;

  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: #282c34;
  }
`

type LinkProps = {
  to: string
  children: string
}

function Link({ to, children }: LinkProps) {
  return (
    <RouterLink to={to}>
      <Button>{children}</Button>
    </RouterLink>
  )
}

export default Link
