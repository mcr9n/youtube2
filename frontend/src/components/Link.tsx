import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  padding: 8px 24px;
  border: none;
  border-radius: 8px;
  background-color: #6200ee;

  font-size: 24px;
  text-decoration: none;
  color: white;

  cursor: pointer;
  transition: filter 0.2s;
  :hover {
    filter: brightness(0.9);
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
