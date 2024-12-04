const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const messageModel = require('../models/messagesModel');

exports.sendMessage = async (req, res) => {
    const { requestId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id; // Estratto dal token JWT

    try {
        // Crea un nuovo messaggio
        const newMessage = await messageModel.createMessage({
            request_id: requestId,
            sender_id: senderId,
            message
        });

        res.status(201).json({ message: 'Messaggio inviato', data: newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore interno del server', error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const { requestId } = req.params;

    try {
        // Recupera i messaggi associati alla richiesta
        const messages = await messageModel.getMessagesByRequest(requestId);

        res.status(200).json({ data: messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore interno del server', error: error.message });
    }
};


// Funzione per creare una nuova richiesta
exports.createRequest = async (req, res) => {
    const { userId, cig, expirationDate, attachments } = req.body;

    if (!userId || !cig || !expirationDate) {
        return res.status(400).json({ message: 'userId, cig e expirationDate sono obbligatori' });
    }

    try {
        const { data, error } = await supabase
            .from('requests')
            .insert({
                user_id: userId,
                cig,
                expiration_date: expirationDate,
                attachments,
                status: 'Da assegnare', // Stato iniziale
                created_at: new Date(),
            })
            .single();

        if (error) {
            return res.status(500).json({ message: 'Errore durante la creazione della richiesta', error });
        }

        res.status(201).json({
            message: 'Richiesta creata con successo',
            request: data,
        });
    } catch (err) {
        console.error('Errore durante la creazione della richiesta:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

// Funzione per recuperare tutte le richieste
exports.getAllRequests = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .select('*');

        if (error) {
            return res.status(500).json({ message: 'Errore durante il recupero delle richieste', error });
        }

        res.json(data);
    } catch (err) {
        console.error('Errore durante il recupero delle richieste:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

// Funzione per aggiornare lo stato di una richiesta
exports.updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Lo stato è obbligatorio' });
    }

    try {
        const { data, error } = await supabase
            .from('requests')
            .update({ status })
            .eq('id', requestId)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: 'Richiesta non trovata o errore durante l\'aggiornamento', error });
        }

        res.json({
            message: 'Stato della richiesta aggiornato con successo',
            request: data,
        });
    } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

// Funzione per recuperare una singola richiesta
exports.getRequestById = async (req, res) => {
    const { requestId } = req.params;

    try {
        const { data, error } = await supabase
            .from('requests')
            .select('*')
            .eq('id', requestId)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: 'Richiesta non trovata', error });
        }

        res.json(data);
    } catch (err) {
        console.error('Errore durante il recupero della richiesta:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};
