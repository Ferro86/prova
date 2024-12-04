const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Crea un nuovo utente
exports.createUser = async (userData) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert(userData)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante la creazione dell\'utente:', err);
        throw err;
    }
};

// Recupera un utente per email
exports.getUserByEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero dell\'utente per email:', err);
        throw err;
    }
};

// Recupera un utente per ID
exports.getUserById = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero dell\'utente per ID:', err);
        throw err;
    }
};

// Aggiorna i dati di un utente
exports.updateUser = async (userId, updates) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'aggiornamento dell\'utente:', err);
        throw err;
    }
};

// Elimina un utente
exports.deleteUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'eliminazione dell\'utente:', err);
        throw err;
    }
};
