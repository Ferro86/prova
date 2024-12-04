const { createLogger, format, transports } = require('winston');

// Configura il formato del log
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
);

// Crea il logger
const logger = createLogger({
    level: 'info', // Livello minimo dei log da registrare (info, warn, error, ecc.)
    format: logFormat,
    transports: [
        // Registra i log nella console
        new transports.Console(),
        // Registra i log in un file (per errori gravi)
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Registra tutti i log in un file generale
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

// Funzioni di logging specifiche
module.exports = {
    info: (message) => logger.info(message),
    warn: (message) => logger.warn(message),
    error: (message) => logger.error(message),
};
