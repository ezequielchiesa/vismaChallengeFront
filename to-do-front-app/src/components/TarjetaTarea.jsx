import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Checkbox,
    FormControlLabel
} from '@mui/material'

export default function TarjetaTarea({ tarea }) {
    
    const getCardColor = () => {
        if (tarea.completada) return '#4db6ac'
        return '#f06292'
    }

    const getBorderColor = () => {
        if (tarea.completada) return '#b2dfdb'
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
        if (tarea.completada) return '#4db6ac'
        return '#f06292'
    }

    return (
        <Card
            elevation={2}
            sx={{
                mb: 2,
                bgcolor: getCardColor(),
                border: `2px solid ${getBorderColor()}`,
                '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease-in-out'
                }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Avatar e información */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            {getInitials(tarea.usuario)}
                        </Avatar>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="h6" component="h3" color="white" sx={{ fontWeight: 'bold' }}>
                                {tarea.titulo}
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
                                {tarea.completada ? 'Completada' : 'Pendiente'}
                            </Typography>

                            <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                                ID: {tarea.id}
                            </Typography>
                        </Box>
                    </Box>

                    {!tarea.completada && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        '&.Mui-checked': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" color="white">
                                    Tarea Finalizada
                                </Typography>
                            }
                            sx={{ margin: 0 }}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}