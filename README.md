# Gestor de Tareas - Challenge Técnico Visma

## 📋 Prerequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Backend API** corriendo en `http://localhost:3000`

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone [url-del-repositorio]
   cd vismaChallengeFront
   ```

2. **Navega al directorio del proyecto:**
   ```bash
   cd to-do-front-app
   ```

3. **Instala las dependencias:**
   ```bash
   npm install
   # o si usas yarn
   yarn install
   ```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
npm run dev
# o
yarn dev
```
La aplicación estará disponible en: **http://localhost:5173**

### Producción
```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Linter
```bash
npm run lint
```

## 📦 Dependencias Principales

### Producción:
- **React** `^19.2.0` - Librería principal
- **Material-UI** `^7.3.7` - Framework de componentes UI
- **Axios** `^1.13.2` - Cliente HTTP para APIs
- **Emotion** - Librería de estilos

### Desarrollo:
- **Vite** `^7.2.4` - Bundler y servidor de desarrollo
- **ESLint** - Linter para calidad de código

## 🌐 Endpoints API Requeridos

La aplicación consume los siguientes endpoints del backend:

- **GET** `/tasks` - Obtener todas las tareas
- **POST** `/tasks` - Crear nueva tarea
- **PUT** `/tasks/:id/complete` - Marcar tarea como completada
- **GET** `/users` - Obtener usuarios
- **POST** `/users` - Crear nuevo usuario


## 🎨 Tecnologías Utilizadas

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **UI Framework:** Material-UI (MUI)
- **HTTP Client:** Axios
- **Styling:** Emotion + Material-UI Theme
- **Icons:** Material Icons

## 🔧 Configuración del Puerto

Por defecto, la aplicación corre en el puerto **5173**. Si necesitas cambiarlo, puedes:

1. Modificar `vite.config.js`

## 🐛 Solución de Problemas

### Error CORS
Si encuentras errores CORS, verifica que:
- El backend esté corriendo en `http://localhost:3000`
- El backend tenga CORS configurado correctamente
- Los endpoints coincidan con los esperados

### Dependencias
Si hay problemas con las dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Previsualizar build
- `npm run lint` - Ejecutar linter
