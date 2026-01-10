import { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

export default function FormularioUsuario({ 
  mostrar, 
  onConfirmar, 
  onCancelar 
}) {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [correoUsuario, setCorreoUsuario] = useState('')

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const formularioValido = () => {
    return nombreUsuario.trim() && 
           correoUsuario.trim() && 
           validarEmail(correoUsuario) &&
           nombreUsuario.length <= 50 &&
           correoUsuario.length <= 70
  }

  const manejarConfirmar = () => {
    if (formularioValido()) {
      onConfirmar({
        name: nombreUsuario.trim(),
        email: correoUsuario.trim()
      })
      setNombreUsuario('')
      setCorreoUsuario('')
    }
  }

  const manejarCancelar = () => {
    setNombreUsuario('')
    setCorreoUsuario('')
    onCancelar()
  }

  if (!mostrar) return null

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      p: 2, 
      border: '1px solid #555', 
      borderRadius: 2,
      bgcolor: 'rgba(0, 0, 0, 0.1)',
      borderLeft: '4px solid #bb86fc'
    }}>
      <Typography variant="subtitle2" color="primary.main">
        Nuevo Usuario
      </Typography>
      
      <TextField
        label="Nombre"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        fullWidth
        required
        inputProps={{ maxLength: 50 }}
        helperText={`${nombreUsuario.length}/50 caracteres`}
        variant="outlined"
        size="small"
      />
      
      <TextField
        label="Correo electrónico"
        value={correoUsuario}
        onChange={(e) => setCorreoUsuario(e.target.value)}
        fullWidth
        required
        type="email"
        inputProps={{ maxLength: 70 }}
        helperText={
          correoUsuario && !validarEmail(correoUsuario) 
            ? 'Formato de email inválido' 
            : `${correoUsuario.length}/70 caracteres`
        }
        error={correoUsuario && !validarEmail(correoUsuario)}
        variant="outlined"
        size="small"
      />
      
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="outlined"
          onClick={manejarCancelar}
          size="small"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={manejarConfirmar}
          disabled={!formularioValido()}
          size="small"
        >
          Confirmar
        </Button>
      </Box>
    </Box>
  )
}