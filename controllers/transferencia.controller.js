import { ModelTransferencias } from "../models/transferencia.model.js";

const getAllTransfer = async (req, res) => {
    try {
        const transfer = await ModelTransferencias.getAllTransfer()
        return res.json(transfer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: 'Error al Cargar transferencias.' });
    }
}

const putTransferencia = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body
        // Verificar que emisor, receptor y monto estén presentes y no estén vacíos
        if (!emisor || !receptor || !monto || !emisor.trim() || !receptor.trim() || !monto.trim()) {
            return res.status(400).json({ ok: false, msg: 'El emisor, receptor y monto son campos requeridos.' });
        }

        const transferencia = await ModelTransferencias.registrarTransaccion(emisor, receptor, monto)
        return res.status(201).json(transferencia)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: 'Error al procesar la transferencia.' });
    }
}


export const ControllerTransferencias = {
    getAllTransfer,
    putTransferencia
}