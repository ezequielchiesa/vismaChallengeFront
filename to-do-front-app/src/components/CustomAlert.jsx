import { Snackbar, Alert } from '@mui/material'

export default function CustomAlert({ 
  open, 
  onClose, 
  message, 
  severity = 'info', 
  autoHideDuration = 4000,
  position = { vertical: 'top', horizontal: 'center' }
}) {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={autoHideDuration} 
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}