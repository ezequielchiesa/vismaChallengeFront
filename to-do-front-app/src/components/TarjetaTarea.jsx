import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material'
import { useState } from 'react'
import { tareaRealizada } from '../api/taskCompleted'
import { getTasks } from '../api/getTasks'

export default function TarjetaTarea({ tarea, setTareas }) {
    const [dialogOpen, setDialogOpen] = useState(false)

    const getCardColor = () => {
        if (tarea.status) return '#4db6ac'
        return '#f06292'
    }

    const getBorderColor = () => {
        if (tarea.status) return '#b2dfdb'
        return '#f8bbd0'
    }

    const getInitials = (nombre) => {
        if (!nombre) return 'NN'
        const words = nombre.trim().split(' ')
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase()
        }
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
    }

    const getStatusColor = () => {
        if (tarea.status) return '#4db6ac'
        return '#f06292'
    }

    const handleCardClick = () => {
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
    }

    const handleCheckboxClick = async (e) => {
        e.stopPropagation() // Evitar que se abra el dialog al hacer click en el checkbox

        try {
            await tareaRealizada(tarea.id)

            const res = await getTasks()
            if (res && res.data) {
                setTareas(res.data)
            }
        } catch (error) {
            console.error('Error al completar la tarea:', error)
        }
    }

    return (
        <>
            <Card
                elevation={2}
                sx={{
                    mb: 2,
                    bgcolor: getCardColor(),
                    border: `2px solid ${getBorderColor()}`,
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-1px)',
                        transition: 'all 0.2s ease-in-out'
                    }
                }}
                onClick={handleCardClick}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}
                            >
                                {getInitials(tarea.name)}
                            </Avatar>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography variant="h6" component="h3" color="white" sx={{ fontWeight: 'bold' }}>
                                    {tarea.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: getStatusColor(),
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: 1,
                                        display: 'inline-block',
                                        width: 'fit-content'
                                    }}
                                >
                                    {tarea.status ? 'Completada' : 'Pendiente'}
                                </Typography>

                                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                                    ID: {tarea.id}
                                </Typography>
                            </Box>
                        </Box>

                        {!tarea.status && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '&.Mui-checked': {
                                                color: 'white'
                                            }
                                        }}
                                        onClick={handleCheckboxClick}
                                    />
                                }
                                label={
                                    <Typography variant="body2" color="white">
                                        Tarea Finalizada
                                    </Typography>
                                }
                                sx={{ margin: 0 }}
                                onClick={handleCheckboxClick}
                            />
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
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
                        Detalles de la Tarea
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Título
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {tarea.title}
                            </Typography>
                        </Box>

                        {tarea.description && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Descripción
                                </Typography>
                                <Typography variant="body1">
                                    {tarea.description}
                                </Typography>
                            </Box>
                        )}

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Estado
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: getStatusColor(),
                                    fontWeight: 'bold'
                                }}
                            >
                                {tarea.status ? 'Completada' : 'Pendiente'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Creado por
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                    {getInitials(tarea.name)}
                                </Avatar>
                                <Typography variant="body1">
                                    {tarea.name}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                ID de la tarea
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {tarea.id}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 2 }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(45deg, #bb86fc 30%, #03dac6 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #9c5dfc 30%, #02b8a6 90%)',
                            }
                        }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}