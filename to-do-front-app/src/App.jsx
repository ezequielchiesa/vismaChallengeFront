import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  ThemeProvider,
  createTheme
} from '@mui/material'
import TareasCrear from './components/TareasCrear'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
})

function App() {

  const [tareas, setTareas] = useState([]);
  const [dialogOpenCrear, setDialogOpenCrear] = useState(false);

  const handleOpenDialogCrear = () => {
    setDialogOpenCrear(true)
  }

  const handleCloseDialogCrear = () => {
    setDialogOpenCrear(false)
  }

  const handleNuevaTarea = (nuevaTarea) => {
    setTareas(prev => [...prev, nuevaTarea])
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>

            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Gestor de Tareas
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              Challenge técnico para empresa Visma
            </Typography>

          </Box>

          <Card elevation={3} sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpenDialogCrear}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: 3,
                  background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                    background: 'linear-gradient(45deg, #9c5dfc 30%, #02b8a6 90%)',
                  }
                }}
              >
                + Agregar Nueva Tarea
              </Button>
            </CardContent>
          </Card>

          {tareas.length === 0 &&
            <Box sx={{ mt: 3 }}>
              <Card elevation={1}>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                  >
                    Sin tareas cargadas...
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          }

        </Container>
      </Box>

      <TareasCrear
        open={dialogOpenCrear}
        onClose={handleCloseDialogCrear}
        nuevaTarea={handleNuevaTarea}
      />

    </ThemeProvider>
  )
}

export default App
