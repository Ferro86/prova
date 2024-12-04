const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  
  // Funzione per aggiungere polizze prepagate all'account di un utente
  exports.addPrepaidPolicies = async (req, res) => {
    const { userId, amount } = req.body;
  
    if (!userId || !amount) {
      return res.status(400).json({ message: 'userId e amount sono obbligatori' });
    }
  
    try {
      // Recupera il numero corrente di polizze prepagate dell'utente
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('prepaid_policies')
        .eq('id', userId)
        .single();
  
      if (userError || !user) {
        return res.status(404).json({ message: 'Utente non trovato', error: userError });
      }
  
      // Aggiorna il conteggio delle polizze prepagate
      const newPrepaidPolicies = user.prepaid_policies + amount;
  
      const { data, error } = await supabase
        .from('users')
        .update({ prepaid_policies: newPrepaidPolicies })
        .eq('id', userId);
  
      if (error) {
        return res.status(500).json({ message: 'Errore durante l\'aggiornamento delle polizze prepagate', error });
      }
  
      res.json({
        message: 'Polizze prepagate aggiunte con successo',
        prepaid_policies: newPrepaidPolicies,
      });
    } catch (err) {
      console.error('Errore durante l\'aggiunta delle polizze prepagate:', err);
      res.status(500).json({ message: 'Errore interno del server', error: err });
    }
  };
  
  // Funzione per ottenere il numero di polizze prepagate di un utente
  exports.getPrepaidPolicies = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Recupera le polizze prepagate dell'utente
      const { data: user, error } = await supabase
        .from('users')
        .select('prepaid_policies')
        .eq('id', userId)
        .single();
  
      if (error || !user) {
        return res.status(404).json({ message: 'Utente non trovato', error });
      }
  
      res.json({
        userId: userId,
        prepaid_policies: user.prepaid_policies,
      });
    } catch (err) {
      console.error('Errore durante il recupero delle polizze prepagate:', err);
      res.status(500).json({ message: 'Errore interno del server', error: err });
    }
  };
  