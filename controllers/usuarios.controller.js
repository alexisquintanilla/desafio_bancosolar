import { ModelUsuarios } from "../models/usuarios.model.js";
import { handleError } from '../databases/errors.js'

const getAllUsuarios = async (req, res) => {
    try {
        const users = await ModelUsuarios.getAllUser()
        return res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Ocurrió un error al cargar datos.' });
    }
}

const createUser = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        console.log(req.body)
        // if (!nombre || !balance || !nombre.trim() || typeof balance !== 'string' || !balance.trim()) {
        //     return res.status(400).json({ ok: false, msg: 'El nombre y el balance son campos requeridos.' });
        // }

        const newUser = {
            nombre,
            balance
        }
        const creacion = await ModelUsuarios.createUser(newUser)
        return res.json(creacion)


    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        // console.log(code, msg)
        return res.status(code).json({ ok: false, msg })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.query
        const deleteUser = await ModelUsuarios.deleteUser(id)
        if (!deleteUser) {
            return res.status(404).json({ ok: false, msg: 'Usuario no encontrado.' });
        }
        return res.json(deleteUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Ocurrió un error al eliminar el usuario.' });
    }
}

const putUser = async (req, res) => {
    try {
        const { id } = req.query

        const { name, balance } = req.body
        if (!name || !balance || !name.trim() || !balance.trim()) {
            return res.status(400).json({ ok: false, msg: 'El nombre y el balance son campos requeridos.' })
        }

        const updateUser = {
            name,
            balance,
            id
        }
        const updateUsers = await ModelUsuarios.updateUser(updateUser)

        return res.json(updateUsers)

    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg: "fallo al actualizar" })
    }
}

export const ControllerUsuarios = {
    getAllUsuarios,
    createUser,
    deleteUser,
    putUser
}