// Ejemplo avanzado de uso del cliente JSONBin.io

// Ejemplo 1: Sistema de configuración de aplicación
async function ejemploConfiguracionApp() {
    const configuracion = {
        app: {
            nombre: "Mi App",
            version: "1.0.0",
            idioma: "es",
            tema: "oscuro"
        },
        usuario: {
            notificaciones: true,
            autoGuardado: true,
            timeout: 300
        }
    };

    try {
        // Crear bin con configuración
        const resultado = await jsonbinClient.createBin(configuracion, "config-app");
        console.log("Configuración guardada:", resultado.metadata.id);
        
        // Leer configuración
        const config = await jsonbinClient.readBin(resultado.metadata.id);
        console.log("Configuración cargada:", config.record);
        
        return resultado.metadata.id;
    } catch (error) {
        console.error("Error en configuración:", error);
    }
}

// Ejemplo 2: Sistema de usuarios simple
async function ejemploSistemaUsuarios() {
    const usuarios = {
        usuarios: [
            {
                id: 1,
                nombre: "Juan Pérez",
                email: "juan@email.com",
                role: "admin",
                activo: true,
                fechaCreacion: new Date().toISOString()
            },
            {
                id: 2,
                nombre: "María González",
                email: "maria@email.com",
                role: "user",
                activo: true,
                fechaCreacion: new Date().toISOString()
            }
        ],
        estadisticas: {
            totalUsuarios: 2,
            usuariosActivos: 2,
            ultimaActualizacion: new Date().toISOString()
        }
    };

    try {
        const resultado = await jsonbinClient.createBin(usuarios, "sistema-usuarios");
        console.log("Sistema de usuarios creado:", resultado.metadata.id);
        return resultado.metadata.id;
    } catch (error) {
        console.error("Error en sistema de usuarios:", error);
    }
}

// Ejemplo 3: Lista de tareas (Todo List)
async function ejemploTodoList() {
    const todoList = {
        proyecto: "Lista de Tareas Personal",
        tareas: [
            {
                id: 1,
                titulo: "Aprender JSONBin.io",
                descripcion: "Completar el tutorial y ejemplos",
                completada: false,
                prioridad: "alta",
                fechaCreacion: new Date().toISOString(),
                fechaVencimiento: "2025-08-10"
            },
            {
                id: 2,
                titulo: "Crear proyecto web",
                descripcion: "Desarrollar aplicación con HTML, CSS y JS",
                completada: false,
                prioridad: "media",
                fechaCreacion: new Date().toISOString(),
                fechaVencimiento: "2025-08-15"
            },
            {
                id: 3,
                titulo: "Documentar código",
                descripcion: "Escribir documentación completa",
                completada: true,
                prioridad: "baja",
                fechaCreacion: new Date().toISOString(),
                fechaVencimiento: "2025-08-08"
            }
        ],
        estadisticas: {
            total: 3,
            completadas: 1,
            pendientes: 2,
            porcentajeCompletado: 33.33
        }
    };

    try {
        const resultado = await jsonbinClient.createBin(todoList, "mi-todo-list");
        console.log("Todo List creada:", resultado.metadata.id);
        return resultado.metadata.id;
    } catch (error) {
        console.error("Error en Todo List:", error);
    }
}

// Ejemplo 4: Datos de inventario
async function ejemploInventario() {
    const inventario = {
        tienda: "Electrónicos Tech",
        productos: [
            {
                id: "LAPTOP001",
                nombre: "Laptop Gaming",
                categoria: "Computadoras",
                precio: 1299.99,
                stock: 15,
                proveedor: "TechCorp",
                especificaciones: {
                    procesador: "Intel i7",
                    ram: "16GB",
                    almacenamiento: "512GB SSD"
                }
            },
            {
                id: "MOUSE001",
                nombre: "Mouse Inalámbrico",
                categoria: "Accesorios",
                precio: 29.99,
                stock: 50,
                proveedor: "AccessCorp",
                especificaciones: {
                    tipo: "Óptico",
                    conectividad: "Bluetooth",
                    bateria: "Recargable"
                }
            }
        ],
        resumen: {
            totalProductos: 2,
            valorTotal: 1879.85,
            ultimaActualizacion: new Date().toISOString()
        }
    };

    try {
        const resultado = await jsonbinClient.createBin(inventario, "inventario-tech");
        console.log("Inventario creado:", resultado.metadata.id);
        return resultado.metadata.id;
    } catch (error) {
        console.error("Error en inventario:", error);
    }
}

// Ejemplo 5: Sistema de backup automático
class BackupManager {
    constructor(binId) {
        this.binId = binId;
        this.intervalId = null;
    }

    async iniciarBackupAutomatico(datos, intervalMinutos = 5) {
        console.log(`Iniciando backup automático cada ${intervalMinutos} minutos`);
        
        this.intervalId = setInterval(async () => {
            try {
                await this.realizarBackup(datos);
                console.log("Backup realizado:", new Date().toLocaleTimeString());
            } catch (error) {
                console.error("Error en backup automático:", error);
            }
        }, intervalMinutos * 60 * 1000);
    }

    async realizarBackup(datos) {
        const datosConTimestamp = {
            ...datos,
            backup: {
                fecha: new Date().toISOString(),
                version: Date.now()
            }
        };

        if (this.binId) {
            return await jsonbinClient.updateBin(this.binId, datosConTimestamp);
        } else {
            const resultado = await jsonbinClient.createBin(datosConTimestamp, "backup-automatico");
            this.binId = resultado.metadata.id;
            return resultado;
        }
    }

    detenerBackup() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Backup automático detenido");
        }
    }
}

// Funciones de utilidad para trabajar con datos
const DataUtils = {
    // Agregar nuevo elemento a un array en un bin
    async agregarElemento(binId, arrayPath, nuevoElemento) {
        try {
            const datos = await jsonbinClient.readBin(binId);
            const array = this.getNestedProperty(datos.record, arrayPath);
            
            if (Array.isArray(array)) {
                array.push(nuevoElemento);
                await jsonbinClient.updateBin(binId, datos.record);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al agregar elemento:", error);
            return false;
        }
    },

    // Actualizar elemento específico
    async actualizarElemento(binId, arrayPath, elementId, datosActualizados) {
        try {
            const datos = await jsonbinClient.readBin(binId);
            const array = this.getNestedProperty(datos.record, arrayPath);
            
            if (Array.isArray(array)) {
                const index = array.findIndex(item => item.id === elementId);
                if (index !== -1) {
                    array[index] = { ...array[index], ...datosActualizados };
                    await jsonbinClient.updateBin(binId, datos.record);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error al actualizar elemento:", error);
            return false;
        }
    },

    // Eliminar elemento
    async eliminarElemento(binId, arrayPath, elementId) {
        try {
            const datos = await jsonbinClient.readBin(binId);
            const array = this.getNestedProperty(datos.record, arrayPath);
            
            if (Array.isArray(array)) {
                const index = array.findIndex(item => item.id === elementId);
                if (index !== -1) {
                    array.splice(index, 1);
                    await jsonbinClient.updateBin(binId, datos.record);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Error al eliminar elemento:", error);
            return false;
        }
    },

    // Obtener propiedad anidada
    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    },

    // Establecer propiedad anidada
    setNestedProperty(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }
};

// Ejemplo de uso de las funciones avanzadas
async function ejemploUsoAvanzado() {
    console.log("=== Ejemplos Avanzados de JSONBin.io ===");
    
    // 1. Crear datos de ejemplo
    console.log("\n1. Creando datos de ejemplo...");
    const configId = await ejemploConfiguracionApp();
    const usuariosId = await ejemploSistemaUsuarios();
    const todoId = await ejemploTodoList();
    const inventarioId = await ejemploInventario();
    
    // 2. Usar utilidades de datos
    if (usuariosId) {
        console.log("\n2. Agregando nuevo usuario...");
        await DataUtils.agregarElemento(usuariosId, 'usuarios', {
            id: 3,
            nombre: "Carlos Rodríguez",
            email: "carlos@email.com",
            role: "user",
            activo: true,
            fechaCreacion: new Date().toISOString()
        });
    }
    
    // 3. Iniciar backup automático (comentado para evitar que se ejecute)
    /*
    if (configId) {
        console.log("\n3. Iniciando backup automático...");
        const backupManager = new BackupManager(configId);
        await backupManager.iniciarBackupAutomatico({
            datos: "importantes",
            timestamp: new Date().toISOString()
        }, 1); // Cada 1 minuto para prueba
        
        // Detener después de 5 minutos
        setTimeout(() => {
            backupManager.detenerBackup();
        }, 5 * 60 * 1000);
    }
    */
    
    console.log("\n✅ Ejemplos completados!");
}

// Ejecutar ejemplos (descomenta la línea siguiente para ejecutar)
// ejemploUsoAvanzado();
