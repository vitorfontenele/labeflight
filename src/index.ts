import express from 'express';
import cors from 'cors';
import { PilotController } from './controller/PilotController';
import { FlightController } from './controller/FlightController';

// Instanciando o express
const app = express()
app.use(cors())
app.use(express.json())

// Instanciando controllers
const pilotController = new PilotController();
const flightController = new FlightController();

// Endpoints
app.get("/pilots", pilotController.getPilots);

app.get("/pilots/:id", pilotController.getPilotById);

app.post("/pilots", pilotController.createPilot);

app.get("/flights", flightController.getFlights);

app.get("/flights/:id", flightController.getFlightById);

app.post("/flights", flightController.createFlight);

// Porta
app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})