const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Crea una nuova polizza
exports.createPolicy = async (policyData) => {
    try {
        const { data, error } = await supabase
            .from('policies')
            .insert(policyData)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante la creazione della polizza:', err);
        throw err;
    }
};

// Recupera tutte le polizze
exports.getAllPolicies = async () => {
    try {
        const { data, error } = await supabase
            .from('policies')
            .select('*');

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero delle polizze:', err);
        throw err;
    }
};

// Recupera una polizza specifica per ID
exports.getPolicyById = async (policyId) => {
    try {
        const { data, error } = await supabase
            .from('policies')
            .select('*')
            .eq('id', policyId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante il recupero della polizza:', err);
        throw err;
    }
};

// Aggiorna una polizza esistente
exports.updatePolicy = async (policyId, updates) => {
    try {
        const { data, error } = await supabase
            .from('policies')
            .update(updates)
            .eq('id', policyId)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'aggiornamento della polizza:', err);
        throw err;
    }
};

// Elimina una polizza
exports.deletePolicy = async (policyId) => {
    try {
        const { data, error } = await supabase
            .from('policies')
            .delete()
            .eq('id', policyId);

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Errore durante l\'eliminazione della polizza:', err);
        throw err;
    }
};
