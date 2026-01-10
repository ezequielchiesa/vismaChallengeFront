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
  FormHelperText,
  Alert,
  Snackbar
} from '@mui/material'
import { crearUsuario } from '../api/usuarios'

export default function TareasCrear({ open, onClose, nuevaTarea }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')
  
  // Estados para crear usuario
  const [mostrandoFormUsuario, setMostrandoFormUsuario] = useState(false)
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [correoUsuario, setCorreoUsuario] = useState('')
  const [alertaAbierta, setAlertaAbierta] = useState(false)
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const [tipoAlerta, setTipoAlerta] = useState('success')

  // Datos simulados de usuarios
  const usuarios = [
    { id: 1, name: 'Ezequiel Chiesa' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Juan Pérez' },
    { id: 4, name: 'Ana López' },
    { id: 5, name: 'Carlos Martínez' }
  ]

  // Validación de email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Verificar si el formulario de usuario es válido
  const formularioUsuarioValido = () => {
    return nombreUsuario.trim() && 
           correoUsuario.trim() && 
           validarEmail(correoUsuario) &&
           nombreUsuario.length <= 50 &&
           correoUsuario.length <= 70
  }

  const mostrarFormularioUsuario = () => {
    setMostrandoFormUsuario(true)
  }

  const confirmarCrearUsuario = async () => {
    try {
      const nuevoUsuarioData = {
        name: nombreUsuario.trim(),
        email: correoUsuario.trim()
      }
      
      const respuesta = await crearUsuario(nuevoUsuarioData)
      
      // Resetear valores y ocultar formulario
      setNombreUsuario('')
      setCorreoUsuario('')
      setMostrandoFormUsuario(false)
      
      // Mostrar alerta de éxito
      setMensajeAlerta(`Usuario "${nuevoUsuarioData.name}" creado exitosamente`)
      setTipoAlerta('success')
      setAlertaAbierta(true)
      
    } catch (error) {
      setMensajeAlerta('Error al crear usuario. Intenta nuevamente.')
      setTipoAlerta('error')
      setAlertaAbierta(true)
    }
  }

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
    setMostrandoFormUsuario(false)
    setNombreUsuario('')
    setCorreoUsuario('')
    onClose()
  }

  return (
    <>
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
                onClick={mostrarFormularioUsuario}
              >
                Crear Usuario
              </Button>
            </Box>

            {/* Formulario para crear usuario */}
            {mostrandoFormUsuario && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2,
                bgcolor: '#f9f9f9'
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
                
                <Button
                  variant="contained"
                  onClick={confirmarCrearUsuario}
                  disabled={!formularioUsuarioValido()}
                  sx={{ alignSelf: 'flex-end', mt: 1 }}
                >
                  Confirmar
                </Button>
              </Box>
            )}
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

    {/* Snackbar para alertas */}
    <Snackbar 
      open={alertaAbierta} 
      autoHideDuration={4000} 
      onClose={() => setAlertaAbierta(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={() => setAlertaAbierta(false)} 
        severity={tipoAlerta}
        sx={{ width: '100%' }}
      >
        {mensajeAlerta}
      </Alert>
    </Snackbar>
  </>
  )
}
