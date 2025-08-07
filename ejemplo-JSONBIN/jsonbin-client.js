/**
 * Cliente para JSONBin.io
 * Maneja todas las operaciones CRUD con la API de JSONBin.io
 */
class JSONBinClient {
    constructor() {
        this.baseUrl = 'https://api.jsonbin.io/v3';
        this.apiKey = null;
    }

    /**
     * Establece la API Key
     * @param {string} apiKey - Tu API Key de JSONBin.io
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Obtiene los headers necesarios para las peticiones
     * @returns {Object} Headers de la petición
     */
    getHeaders() {
        if (!this.apiKey) {
            throw new Error('API Key no configurada. Por favor configura tu API Key primero.');
        }

        return {
            'Content-Type': 'application/json',
            'X-Master-Key': this.apiKey
        };
    }

    /**
     * Crea un nuevo bin con datos
     * @param {Object} data - Los datos a guardar
     * @param {string} name - Nombre opcional del bin
     * @returns {Promise<Object>} Respuesta de la API
     */
    async createBin(data, name = null) {
        try {
            const headers = this.getHeaders();
            
            // Añadir nombre del bin si se proporciona
            if (name) {
                headers['X-Bin-Name'] = name;
            }

            const response = await fetch(`${this.baseUrl}/b`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Bin creado:', result);
            return result;
        } catch (error) {
            console.error('Error al crear bin:', error);
            throw error;
        }
    }

    /**
     * Lee los datos de un bin existente
     * @param {string} binId - ID del bin a leer
     * @returns {Promise<Object>} Los datos del bin
     */
    async readBin(binId) {
        try {
            const response = await fetch(`${this.baseUrl}/b/${binId}/latest`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Datos leídos:', result);
            return result;
        } catch (error) {
            console.error('Error al leer bin:', error);
            throw error;
        }
    }

    /**
     * Actualiza un bin existente
     * @param {string} binId - ID del bin a actualizar
     * @param {Object} data - Nuevos datos
     * @returns {Promise<Object>} Respuesta de la API
     */
    async updateBin(binId, data) {
        try {
            const response = await fetch(`${this.baseUrl}/b/${binId}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Bin actualizado:', result);
            return result;
        } catch (error) {
            console.error('Error al actualizar bin:', error);
            throw error;
        }
    }

    /**
     * Elimina un bin
     * @param {string} binId - ID del bin a eliminar
     * @returns {Promise<Object>} Respuesta de la API
     */
    async deleteBin(binId) {
        try {
            const response = await fetch(`${this.baseUrl}/b/${binId}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Bin eliminado:', result);
            return result;
        } catch (error) {
            console.error('Error al eliminar bin:', error);
            throw error;
        }
    }

    /**
     * Lista todos los bins de la cuenta
     * @returns {Promise<Array>} Lista de bins
     */
    async listBins() {
        try {
            const response = await fetch(`${this.baseUrl}/c/bins`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Lista de bins:', result);
            return result;
        } catch (error) {
            console.error('Error al listar bins:', error);
            throw error;
        }
    }

    /**
     * Obtiene información de un bin específico
     * @param {string} binId - ID del bin
     * @returns {Promise<Object>} Información del bin
     */
    async getBinInfo(binId) {
        try {
            const response = await fetch(`${this.baseUrl}/b/${binId}`, {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Información del bin:', result);
            return result;
        } catch (error) {
            console.error('Error al obtener información del bin:', error);
            throw error;
        }
    }

    /**
     * Función de utilidad para manejar errores de red
     * @param {Error} error - El error capturado
     * @returns {string} Mensaje de error amigable
     */
    handleError(error) {
        if (error.message.includes('Failed to fetch')) {
            return 'Error de conexión. Verifica tu conexión a internet.';
        } else if (error.message.includes('401')) {
            return 'API Key inválida. Verifica tu API Key.';
        } else if (error.message.includes('404')) {
            return 'Bin no encontrado. Verifica el ID del bin.';
        } else {
            return error.message;
        }
    }
}

// Crear instancia global del cliente
const jsonbinClient = new JSONBinClient();

// Funciones de utilidad
const JSONBinUtils = {
    /**
     * Valida si un string es JSON válido
     * @param {string} str - String a validar
     * @returns {boolean} True si es JSON válido
     */
    isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    },

    /**
     * Formatea JSON para mostrar
     * @param {Object} obj - Objeto a formatear
     * @returns {string} JSON formateado
     */
    formatJSON(obj) {
        return JSON.stringify(obj, null, 2);
    },

    /**
     * Genera un ID único simple
     * @returns {string} ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Valida un Bin ID
     * @param {string} binId - ID a validar
     * @returns {boolean} True si es válido
     */
    isValidBinId(binId) {
        return /^[a-zA-Z0-9_-]+$/.test(binId) && binId.length >= 10;
    }
};

// Exportar para uso en módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JSONBinClient, JSONBinUtils };
}
