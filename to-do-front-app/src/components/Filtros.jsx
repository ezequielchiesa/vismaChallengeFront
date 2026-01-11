import { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from '@mui/material'
import TarjetaTarea from './TarjetaTarea'
import { getTasks } from '../api/getTasks'

export default function Filtros({ tareas, setTareas }) {
  const [filtroActivo, setFiltroActivo] = useState('todas')

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const res = await getTasks()
        if (res && res.data) {
          setTareas(res.data)
        }
      } catch (error) {
        console.error('Error al cargar tareas:', error)
      }
    }

    cargarTareas()
  }, [])

  // Filtrar tareas según el filtro activo
  const tareasFiltradas = () => {
    switch (filtroActivo) {
      case 'finalizadas':
        return tareas.filter(tarea => tarea.status === true || tarea.status === 1)
      case 'pendientes':
        return tareas.filter(tarea => tarea.status === false || tarea.status === 0)
      default:
        return tareas
    }
  }

  const handleFiltroClick = (filtro) => {
    setFiltroActivo(filtro)
  }

  return (
    <>
      {tareas.length === 0
        ?
        <Box sx={{ mt: 3 }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
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
        :
        <Box sx={{ mt: 3, mb: 3 }}>
          <Card elevation={1}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', px: { xs: 0, lg: 5 } }}>
                <Button 
                  fullWidth 
                  variant={filtroActivo === 'todas' ? 'contained' : 'outlined'}
                  onClick={() => handleFiltroClick('todas')}
                >
                  Todas
                </Button>
                <Button 
                  fullWidth 
                  variant={filtroActivo === 'finalizadas' ? 'contained' : 'outlined'}
                  onClick={() => handleFiltroClick('finalizadas')}
                >
                  Finalizadas
                </Button>
                <Button 
                  fullWidth 
                  variant={filtroActivo === 'pendientes' ? 'contained' : 'outlined'}
                  onClick={() => handleFiltroClick('pendientes')}
                >
                  Pendientes
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      }

      {
        Array.isArray(tareasFiltradas()) && tareasFiltradas().length > 0 && tareasFiltradas().map((tarea) => (
          <TarjetaTarea
            key={tarea.id}
            tarea={tarea}
            setTareas={setTareas}
          />
        ))
      }
    </>
  )
}