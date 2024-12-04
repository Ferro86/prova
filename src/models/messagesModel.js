const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// Funzione per creare un messaggio
exports.createMessage = async (messageData) => {
    const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .single();

    if (error) throw error;
    return data;
};

// Funzione per recuperare i messaggi associati a una richiesta
exports.getMessagesByRequest = async (requestId) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
};
