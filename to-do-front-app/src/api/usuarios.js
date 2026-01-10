import axios from 'axios'

export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await axios.post('http://localhost:3000/users', usuario)
    console.log('Respuesta del servidor:', respuesta.data)
    return respuesta.data
  } catch (error) {
    console.error('Error al crear usuario:', error)
    throw error
  }
}