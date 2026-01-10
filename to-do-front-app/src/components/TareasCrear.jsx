import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material'

export default function TareasCrear({ open, onClose, nuevaTarea }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')

  // Datos simulados de usuarios
  const usuarios = [
    { id: 1, name: 'Ezequiel Chiesa' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Juan Pérez' },
    { id: 4, name: 'Ana López' },
    { id: 5, name: 'Carlos Martínez' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (titulo.trim()) {
      const usuarioAsignado = usuarioSeleccionado 
        ? usuarios.find(u => u.id === usuarioSeleccionado)?.name 
        : 'Sin asignar'
      
      nuevaTarea({
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completada: false,
        usuario: usuarioAsignado
      })
      limpiarFormulario();
    }
  }

  const limpiarFormulario = () => {
    setTitulo('')
    setDescripcion('')
    setUsuarioSeleccionado('')
    onClose()
  }

  return (
    <Dialog 
      open={open} 
      onClose={limpiarFormulario} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { 
          bgcolor: 'background.paper',
          borderRadius: 2 
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="h2" color="primary.main">
          Agregar Nueva Tarea
        </Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Título de la tarea"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              fullWidth
              required
              inputProps={{ maxLength: 50 }}
              helperText={`${titulo.length}/50 caracteres`}
              variant="outlined"
              sx={{ mb: 1 }}
            />
            
            <TextField
              label="Descripción (opcional)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
              multiline
              rows={4}
              inputProps={{ maxLength: 500 }}
              helperText={`${descripcion.length}/500 caracteres`}
              variant="outlined"
            />
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <FormControl fullWidth>
                <InputLabel id="usuario-select-label">Usuario</InputLabel>
                <Select
                  labelId="usuario-select-label"
                  value={usuarioSeleccionado}
                  label="Usuario"
                  onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>Sin asignar</em>
                  </MenuItem>
                  {usuarios.map((usuario) => (
                    <MenuItem key={usuario.id} value={usuario.id}>
                      {usuario.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Asignar tarea</FormHelperText>
              </FormControl>
              
              <Button
                variant="outlined"
                sx={{ 
                  minWidth: '140px',
                  height: '56px',
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
                onClick={() => {
                  // Aquí se podría abrir otro dialog para crear usuario
                  alert('Función "Crear Usuario" pendiente de implementar')
                }}
              >
                Crear Usuario
              </Button>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={limpiarFormulario}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={!titulo.trim() || !usuarioSeleccionado}
            sx={{
              background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #9c5dfc 30%, #02b8a6 90%)',
              }
            }}
          >
            Agregar Tarea
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
