import { Router } from "express";
import { ControllerTransferencias } from "../controllers/transferencia.controller.js";

const router = Router()

router.get('/transferencias', ControllerTransferencias.getAllTransfer)

router.post('/transferencia', ControllerTransferencias.putTransferencia)


export default router
