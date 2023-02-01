import express, { Request, Response } from 'express';
import cors from 'cors';
import { PilotController } from './controller/PilotController';

// Instanciando o express
const app = express()
app.use(cors())
app.use(express.json())

// Instanciando controllers
const pilotController = new PilotController();

app.get("/pilots", pilotController.getPilots);

// Porta
app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})