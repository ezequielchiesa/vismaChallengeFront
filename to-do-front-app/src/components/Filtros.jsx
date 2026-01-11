import { useEffect } from 'react'
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
                <Button fullWidth variant="outlined">Todas</Button>
                <Button fullWidth variant="outlined">Finalizadas</Button>
                <Button fullWidth variant="outlined">Pendientes</Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      }

      {
        Array.isArray(tareas) && tareas.length > 0 && tareas.map((tarea) => (
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