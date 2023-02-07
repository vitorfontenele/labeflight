import express from 'express';
import cors from 'cors';
import { pilotRouter } from './router/pilotRouter';
import { flightRouter } from './router/flightRouter';

// Instanciando o express
const app = express()
app.use(cors())
app.use(express.json())

// Router
app.use("/pilots", pilotRouter);
app.use("/flights", flightRouter);

// Porta
app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})