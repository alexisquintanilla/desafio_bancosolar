import { pool } from "../databases/connection.js";

const getAllUser = async () => {
    const { rows } = await pool.query('SELECT * FROM USUARIOS ORDER BY NOMBRE ASC')
    return rows
}

const createUser = async ({ nombre, balance }) => {
    const query = {
        text: `
        INSERT INTO USUARIOS (NOMBRE,BALANCE) 
        VALUES ($1, $2)
        RETURNING *
        `,
        values: [nombre, balance]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const deleteUser = async (id) => {
    const query = {
        text: `
        DELETE FROM USUARIOS WHERE ID = $1 RETURNING *
        `,
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const updateUser = async ({ name, balance, id }) => {
    const query = {
        text: `UPDATE USUARIOS
        SET NOMBRE = $1, BALANCE=$2
        WHERE ID = $3 RETURNING *`,
        values: [name, balance, id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}


export const ModelUsuarios = {
    getAllUser,
    createUser,
    deleteUser,
    updateUser
}