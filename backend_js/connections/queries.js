const mysql = require('mysql2/promise')
const db = require('../config/db')

async function connect_to_db() {
    return await mysql.createConnection(db);
}


async function getAllUsers() {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('SELECT * FROM User')
        console.log(results)
        return results
    } catch (error) {
        console.log("Error al obtener todos los usuarios", error)
    } finally {
        connection.end();
    }
}


async function NewUser(username, password, email) {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('CALL user_insert(?,?,?)', [username, email, password]);
        resultado = results[0][0].resultado

        if (resultado == 0) {
            throw new Error("El usuario ya existe")
        }
        return [1, results]
    } catch (error) {
        
        console.log("Error de registro: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}

async function editUser(user_id, newUsername, newCorreo, newContraseña, newPoints, newPhoto) {
    const connection = await connect_to_db()
    //Imprime los datos que se reciben

    try {
        console.log("adentro del try")
        const [results] = await connection.query('CALL user_update(?,?,?,?,?,?)', [user_id, newUsername, newCorreo, newContraseña, newPoints, newPhoto])
        resultado = results[0][0].affected_rows;
        console.log("adentro del query")
        console.log(resultado)
        if (resultado == 0) {
            throw new Error("Error al editar usuario")
        }
        return [1, "Usuario editado correctamente"]
    } catch (error) {
        console.log("Error al editar: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }
}


async function editTravelReview(travel_id, travel_review) {
    const connection = await connect_to_db()
    //Imprime los datos que se reciben

    try {
        console.log("adentro del try")
        const [results] = await connection.query('CALL travel_edit_review(?,?)', [travel_id, travel_review])
        resultado = results[0][0].affected_rows;
        console.log("adentro del query")
        console.log(resultado)
        if (resultado == 0) {
            throw new Error("Error al editar usuario")
        }
        return [1, resultado]
    } catch (error) {
        console.log("Error al editar: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }
}



async function deleteUser(user_id) {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('CALL user_delete(?)', [user_id])
        resultado = results[0][0].resultado
        console.log("buenas",resultado)
        if (resultado == 0) {
            throw new Error("Usuario a eliminar no existe")
        }
        return [1, "Usuario eliminado correctamente"]
    } catch (error) {
        console.log("Error al eliminar: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}


async function getAllTravels() {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('CALL travel_get_all();')
        console.log(results)
        return results
    } catch (error) {
        console.log("Error al obtener todos los usuarios", error)
    } finally {
        connection.end();
    }
}


async function NewTravel(name, description, cost, image_link) {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('CALL travel_insert(?,?,?,?)', [name, description, cost, image_link]);
        resultado = results[0][0].resultado

        if (resultado == 0) {
            throw new Error("El usuario ya existe")
        }
        return [1, results]
    } catch (error) {
        
        console.log("Error de registro: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}

//  travel_get_travel_by_id(1)
// ESTA ES PARA OBTENER LA INFORMACION DE UN VIAJE SOLO CON EL ID
async function getTravel(travel_id) {
    const connection = await connect_to_db()
    console.log("adentro de getTravel " + travel_id) 
    try {
        const [results] = await connection.query('CALL travel_get_travel_by_id(?)', [travel_id])
        respuesta = results[0][0]
        console.log("buenas")
        if (results == 0) {
            throw new Error("No se encontro el viaje")
        }
        return [1, respuesta]
    } catch (error) {
        console.log("Error al obtener id: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}

async function userLogin(username, password) {
    console.log(username, password);
    const connection = await connect_to_db();
    try {
        const [results] = await connection.query('CALL user_login(?,?)', [username, password]);
        console.log(results[0][0]);
        resultado = results[0][0]
        if (results.length === 0) {
            throw new Error("Usuario no encontrado o credenciales incorrectas.");
        }
        return [1, resultado];
    } catch (error) {
        console.log("Error al intentar iniciar sesión: ", error.message);
        return [0, error.message];
    } finally {
        connection.end();
    }
}



async function NewReview(description, score, user, travel) {
    const connection = await connect_to_db()
    try {
        const [results] = await connection.query('CALL review_insert(?,?,?,?)', [description, score, user, travel]);
        resultado = results[0][0].resultado

        if (resultado == 0) {
            throw new Error("No se inserto")
        }
        return [1, results]
    } catch (error) {
        
        console.log("Error de registro: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}


async function getReview(travel_id) {
    const connection = await connect_to_db()
    console.log("adentro de getTravel " + travel_id) 
    try {
        const [results] = await connection.query('CALL review_get_review_by_travel_id(?)', [travel_id])
        respuesta = results[0]
        console.log("buenas")
        if (results == 0) {
            throw new Error("No se encontro el viaje")
        }
        return [1, respuesta]
    } catch (error) {
        console.log("Error al obtener id: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}


async function getTravelScore(travel_id) {
    const connection = await connect_to_db()
    console.log("adentro de getTravelSCORE " + travel_id) 
    try {
        const [results] = await connection.query('CALL travel_get_score_by_id(?)', [travel_id])
        console.log("buenas!! " + results[0][0].travel_review )
        if (results.length == 0) {
            throw new Error("No se encontro el viaje")
        }
        return [1, results[0][0].travel_review]
    } catch (error) {
        console.log("Error al obtener id: ", error.message)
        return [0, error.message]
    } finally {
        connection.end()
    }

}



module.exports = { 
    getAllUsers, 
    NewUser, 
    editUser,
    deleteUser,
    getAllTravels,
    NewTravel,
    getTravel,
    NewReview,
    getReview,
    getTravelScore,
    editTravelReview,
    userLogin
}
