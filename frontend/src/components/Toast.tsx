import { Alert, Collapse, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useEffect } from 'react'
import styled from 'styled-components'

type ToastProps = {
  open: boolean
  setOpen: (open: boolean) => void
  message: string
  severity: 'success' | 'error'
}

const CollapseStyled = styled(Collapse)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 9999;
`

function Toast({ message, open, setOpen, severity }: ToastProps) {
  useEffect(() => {
    if (open)
      setTimeout(() => {
        setOpen(false)
      }, 3000)
  }, [open, setOpen])

  return (
    <CollapseStyled in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </CollapseStyled>
  )
}

export default Toast
