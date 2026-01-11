import axios from 'axios'

export const tareaRealizada = async (id) => {
  try {
    const respuesta = await axios.put(`http://localhost:3000/tasks/${id}/complete`)
    console.log('Tarea marcada como completada:', respuesta.data)
    return respuesta.data
  } catch (error) {
    console.error('Error al marcar tarea como completada:', error)
    throw error
  }
}