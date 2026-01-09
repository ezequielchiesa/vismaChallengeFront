import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'

export default function TareasCrear({ open, onClose, nuevaTarea }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (titulo.trim()) {
      nuevaTarea({
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        completada: false
      })
      limpiarFormulario();
    }
  }

  const limpiarFormulario = () => {
    setTitulo('')
    setDescripcion('')
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
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={!titulo.trim()}
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
