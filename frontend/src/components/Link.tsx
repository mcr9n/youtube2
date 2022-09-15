import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  to: string
  children: string
}

function Link({ to, children }: LinkProps) {
  return (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Button variant="contained" size="large" color="primary">
        {children}
      </Button>
    </RouterLink>
  )
}

export default Link
