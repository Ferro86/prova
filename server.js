const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('yaml');
require('dotenv').config(); // Carica le variabili d'ambiente

// Inizializzazione dell'app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importazione delle rotte
const userRoutes = require('./src/routes/userRoutes');
const requestsRoutes = require('./src/routes/requestsRoutes');
const prepaidPoliciesRoutes = require('./src/routes/prepaidPoliciesRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');

// Configurazione Swagger
const swaggerDocument = yaml.parse(fs.readFileSync('./docs/swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotte
app.use('/api/users', userRoutes); // Rotte per gli utenti
app.use('/api/requests', requestsRoutes); // Rotte per le richieste
app.use('/api/prepaid-policies', prepaidPoliciesRoutes); // Rotte per le polizze prepagate
app.use('/api/notifications', notificationRoutes); // Rotte per le notifiche

// Gestione errori generici
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Errore interno del server', error: err.message });
});

// Avvio del server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
    console.log(`Documentazione Swagger disponibile su http://localhost:${PORT}/api-docs`);
});
