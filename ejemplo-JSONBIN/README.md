# 📦 Ejemplo JSONBin.io - JavaScript y HTML

Este proyecto demuestra cómo usar JSONBin.io para leer y guardar datos desde JavaScript y HTML de manera sencilla.

## 🚀 Características

- ✅ Crear nuevos bins de datos
- ✅ Leer datos existentes
- ✅ Actualizar bins existentes
- ✅ Listar todos tus bins
- ✅ Interfaz web amigable
- ✅ Validación de datos JSON
- ✅ Manejo de errores
- ✅ Almacenamiento local de API Key

## 📋 Requisitos Previos

1. **Cuenta en JSONBin.io**: Regístrate en [jsonbin.io](https://jsonbin.io)
2. **API Key**: Obtén tu API Key desde el dashboard de JSONBin.io
3. **Navegador Web**: Cualquier navegador moderno

## 🛠️ Configuración

### 1. Obtener API Key de JSONBin.io

1. Ve a [jsonbin.io](https://jsonbin.io) y crea una cuenta
2. Inicia sesión en tu dashboard
3. Ve a "API Keys" en el menú
4. Crea una nueva API Key o usa la existente
5. Copia tu API Key (algo como: `$2a$10$...`)

### 2. Configurar el Proyecto

1. Abre `index.html` en tu navegador
2. En la sección "Configuración", pega tu API Key
3. Haz clic en "Guardar API Key"

## 📖 Uso

### Crear un Nuevo Bin

1. Escribe o pega datos JSON en el área de texto
2. Haz clic en "Crear Nuevo Bin"
3. El ID del bin se guardará automáticamente

### Leer Datos

1. Ingresa un Bin ID existente
2. Haz clic en "Leer Datos del Bin"
3. Los datos se mostrarán en el área de resultados

### Actualizar Datos

1. Ingresa un Bin ID existente
2. Modifica los datos JSON
3. Haz clic en "Actualizar Bin Existente"

### Listar Bins

1. Haz clic en "Listar Mis Bins"
2. Se mostrarán todos tus bins con la opción de seleccionarlos

## 📁 Estructura del Proyecto

```
EjemploJsonbin/
├── index.html          # Interfaz principal
├── jsonbin-client.js   # Cliente JavaScript para JSONBin.io
├── styles.css          # Estilos CSS
└── README.md          # Este archivo
```

## 🔧 API de JSONBin.io

### Endpoints Utilizados

- **POST** `/v3/b` - Crear nuevo bin
- **GET** `/v3/b/{bin-id}/latest` - Leer bin
- **PUT** `/v3/b/{bin-id}` - Actualizar bin
- **GET** `/v3/c/bins` - Listar bins
- **DELETE** `/v3/b/{bin-id}` - Eliminar bin

### Headers Requeridos

```javascript
{
  'Content-Type': 'application/json',
  'X-Master-Key': 'TU_API_KEY'
}
```

## 💡 Ejemplos de Datos

### Datos de Usuario
```json
{
  "usuarios": [
    {
      "id": 1,
      "nombre": "Ana García",
      "email": "ana@email.com",
      "activo": true
    },
    {
      "id": 2,
      "nombre": "Carlos López",
      "email": "carlos@email.com",
      "activo": false
    }
  ],
  "configuracion": {
    "tema": "oscuro",
    "idioma": "es",
    "notificaciones": true
  }
}
```

### Datos de Configuración
```json
{
  "app": {
    "nombre": "Mi Aplicación",
    "version": "1.0.0",
    "configuracion": {
      "debug": false,
      "maxUsuarios": 100,
      "caracteristicas": ["auth", "dashboard", "reports"]
    }
  }
}
```

## 🔒 Seguridad

- ✅ API Key se almacena localmente en el navegador
- ✅ Todas las comunicaciones son via HTTPS
- ✅ Validación de datos JSON antes del envío
- ⚠️ No expongas tu API Key en código público

## 🐛 Manejo de Errores

El cliente maneja automáticamente:

- Errores de conexión
- API Key inválida
- Bin no encontrado
- JSON malformado
- Límites de rate limiting

## 📚 Funcionalidades del Cliente JavaScript

### JSONBinClient

```javascript
const client = new JSONBinClient();
client.setApiKey('tu-api-key');

// Crear bin
await client.createBin(data);

// Leer bin
await client.readBin(binId);

// Actualizar bin
await client.updateBin(binId, newData);

// Listar bins
await client.listBins();

// Eliminar bin
await client.deleteBin(binId);
```

### Utilidades

```javascript
// Validar JSON
JSONBinUtils.isValidJSON(jsonString);

// Formatear JSON
JSONBinUtils.formatJSON(object);

// Validar Bin ID
JSONBinUtils.isValidBinId(binId);
```

## 🌐 Despliegue

Para usar en producción:

1. Sube los archivos a tu servidor web
2. Configura HTTPS (requerido para JSONBin.io)
3. Considera usar variables de entorno para la API Key

## 📝 Notas Adicionales

- **Límites**: JSONBin.io tiene límites de requests por minuto
- **Tamaño**: Máximo 100KB por bin en el plan gratuito
- **Privacidad**: Los bins son privados por defecto
- **Versionado**: JSONBin.io mantiene versiones de tus datos

## 🔗 Enlaces Útiles

- [JSONBin.io Documentation](https://jsonbin.io/api-reference)
- [JSONBin.io Dashboard](https://jsonbin.io/app/dashboard)
- [JSON Validator](https://jsonlint.com/)

## 🤝 Contribuciones

Si encuentras algún error o tienes sugerencias:

1. Reporta el issue
2. Sugiere mejoras
3. Comparte el proyecto

---

**¡Disfruta creando con JSONBin.io! 🎉**
