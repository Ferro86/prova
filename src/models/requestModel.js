const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Crea una nuova richiesta
exports.createRequest = async (requestData) => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .insert(requestData)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante la creazione della richiesta:', err);
        throw err;
    }
};

// Recupera tutte le richieste
exports.getAllRequests = async () => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .select('*');

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero delle richieste:', err);
        throw err;
    }
};

// Recupera una richiesta specifica per ID
exports.getRequestById = async (requestId) => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .select('*')
            .eq('id', requestId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero della richiesta:', err);
        throw err;
    }
};

// Aggiorna una richiesta esistente
exports.updateRequest = async (requestId, updates) => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .update(updates)
            .eq('id', requestId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'aggiornamento della richiesta:', err);
        throw err;
    }
};

// Elimina una richiesta
exports.deleteRequest = async (requestId) => {
    try {
        const { data, error } = await supabase
            .from('requests')
            .delete()
            .eq('id', requestId);

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'eliminazione della richiesta:', err);
        throw err;
    }
};
