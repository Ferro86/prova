const jwt = require('jsonwebtoken');

// Middleware per verificare il token JWT
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Estrai il token dal header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Accesso negato. Nessun token fornito.' });
    }

    try {
        // Verifica il token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Salva i dati decodificati del token nella richiesta
        next(); // Passa al prossimo middleware o controller
    } catch (err) {
        res.status(403).json({ message: 'Token non valido o scaduto.' });
    }
};

// Middleware per ruoli specifici
exports.requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Accesso negato. Ruolo non autorizzato.' });
        }
        next();
    };
};

exports.verifyRequestAccess = async (req, res, next) => {
    const { requestId } = req.params;
    const userId = req.user.id;

    try {
        const { data: request, error } = await supabase
            .from('requests')
            .select('id, user_id')
            .eq('id', requestId)
            .single();

        if (error || !request) {
            return res.status(404).json({ message: 'Richiesta non trovata.' });
        }

        if (request.user_id !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accesso negato.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
};
