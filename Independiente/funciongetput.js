export const Jsonbin = {

 async readBin() {
        try {
            const response = await fetch(`${rutaBase()}/b/${binReturn()}/latest`, {
                method: 'GET',
                headers: getHeaders()
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
    } ,  

    async updateBin(data) {
        try {
            const response = await fetch(`${rutaBase()}/b/${binReturn()}`, {
                method: 'PUT',
                headers: getHeaders(),
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
    };

function rutaBase (){
    return "https://api.jsonbin.io/v3"
}

function binReturn(){
    return "68929a10ae596e708fc29f09"
}

function getHeaders() {
    // let req = new XMLHttpRequest();
    // req.setRequestHeader("Content-Type",'application/json', "X-Master-Key", "<YOUR_API_KEY>");
            return {
            'Content-Type': 'application/json',
            'X-Master-Key': "$2a$10$u3.2k9kq/q5T8DjJM2wpi.Smyebu1OZOWmYEA6ta7E5NvQNSPGIhq"
        };
}

