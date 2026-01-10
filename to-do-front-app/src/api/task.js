import axios from 'axios'

export const crearTarea = async (tarea) => {
  try {
    const respuesta = await axios.post('http://localhost:3000/task', tarea)
    // console.log('Respuesta del servidor:', respuesta.data)
    return respuesta.data
  } catch (error) {
    console.error('Error al crear tarea:', error)
    throw error
  }
}