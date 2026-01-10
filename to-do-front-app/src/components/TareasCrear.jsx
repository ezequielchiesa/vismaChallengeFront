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
import { crearUsuario } from '../api/usuarios'
import { crearTarea } from '../api/task'
import CustomAlert from './CustomAlert'
import FormularioUsuario from './FormularioUsuario'

export default function TareasCrear({ open, onClose, listaUsuarios, obtenerUsuarios }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('')

  // Estados para crear usuario
  const [mostrandoFormUsuario, setMostrandoFormUsuario] = useState(false)
  const [alertaAbierta, setAlertaAbierta] = useState(false)
  const [mensajeAlerta, setMensajeAlerta] = useState('')
  const [tipoAlerta, setTipoAlerta] = useState('success')

  const mostrarFormularioUsuario = () => {
    setMostrandoFormUsuario(true)
  }

  const manejarConfirmarUsuario = async (datosUsuario) => {
    try {
      // Al crear un nuevo usuario, recargo la lista de usuarios disponibles
      await crearUsuario(datosUsuario)

      await obtenerUsuarios();

      setMostrandoFormUsuario(false)

      setMensajeAlerta(`Usuario "${datosUsuario.name}" creado exitosamente`)
      setTipoAlerta('success')
      setAlertaAbierta(true)

    } catch (error) {
      setMensajeAlerta('Error al crear usuario. Intenta nuevamente.')
      setTipoAlerta('error')
      setAlertaAbierta(true)
    }
  }

  const manejarCancelarUsuario = () => {
    setMostrandoFormUsuario(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (titulo.trim()) {

      const dataTask = {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        usuario: usuarioSeleccionado
      }

      await crearTarea(dataTask);

      limpiarFormulario();
    }
  }

  const limpiarFormulario = () => {
    setTitulo('')
    setDescripcion('')
    setUsuarioSeleccionado('')
    setMostrandoFormUsuario(false)
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
                    {listaUsuarios.map((usuario) => (
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

              <FormularioUsuario
                mostrar={mostrandoFormUsuario}
                onConfirmar={manejarConfirmarUsuario}
                onCancelar={manejarCancelarUsuario}
              />
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

      <CustomAlert
        open={alertaAbierta}
        onClose={() => setAlertaAbierta(false)}
        message={mensajeAlerta}
        severity={tipoAlerta}
      />
    </>
  )
}
