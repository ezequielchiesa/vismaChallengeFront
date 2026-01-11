import axios from 'axios'

export const getTasks = async () => {
  try {
    const respuesta = await axios.get('http://localhost:3000/getTasks')
    // console.log('Respuesta del servidor:', respuesta.data)
    return respuesta.data
  } catch (error) {
    console.error('Error al crear usuario:', error)
    throw error
  }
}