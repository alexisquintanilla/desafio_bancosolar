import { Router } from "express";
import { ControllerUsuarios } from "../controllers/usuarios.controller.js";

const router = Router()

router.get('/usuarios', ControllerUsuarios.getAllUsuarios)

router.post('/usuario', ControllerUsuarios.createUser)

router.delete('/usuario/', ControllerUsuarios.deleteUser)

router.put('/usuario/', ControllerUsuarios.putUser)

export default router