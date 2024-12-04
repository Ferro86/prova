// Stati delle richieste
exports.REQUEST_STATUSES = {
    DA_ASSEGNARE: 'Da assegnare',
    IN_CARICO: 'Assegnata all\'agenzia',
    FIRMA_CLIENTE: 'Emessa - In attesa di firma del cliente',
    FIRMA_AGENTE: 'Emessa - In attesa di firma dell\'agente',
    COMPLETATA: 'Completata',
    RIFIUTATA: 'Rifiutata',
};

// Ruoli degli utenti
exports.USER_ROLES = {
    BROKER: 'broker',
    CLIENT: 'client',
    AGENCY: 'agency',
    COLLABORATOR: 'collaborator',
};

// Stati dei pagamenti
exports.PAYMENT_STATUSES = {
    IN_ATTESA: 'In attesa',
    COMPLETATO: 'Completato',
    ANNULLATO: 'Annullato',
};

// Configurazioni generali
exports.CONFIG = {
    TOKEN_EXPIRATION: '1h', // Durata del token JWT (1 ora)
    DEFAULT_LOCALE: 'it-IT', // Localizzazione predefinita
};
