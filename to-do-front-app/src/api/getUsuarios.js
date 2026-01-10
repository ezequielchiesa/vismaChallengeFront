import axios from 'axios'

export const getUsuarios = async () => {
  try {
    const respuesta = await axios.get('http://localhost:3000/getUsers')
    // console.log('Respuesta del servidor:', respuesta.data)
    return respuesta.data
  } catch (error) {
    console.error('Error al crear usuario:', error)
    throw error
  }
}