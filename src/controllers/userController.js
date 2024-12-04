const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Funzione di registrazione
exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password e role sono obbligatori' });
    }

    try {
        // Verifica se l'email esiste già
        const { data: existingUser, error: findError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'Email già registrata' });
        }

        // Cripta la password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea il nuovo utente
        const { data, error } = await supabase
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                role,
            })
            .single();

        if (error) {
            return res.status(500).json({ message: 'Errore durante la registrazione', error });
        }

        res.status(201).json({ message: 'Registrazione completata', user: data });
    } catch (err) {
        console.error('Errore durante la registrazione:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

// Funzione di login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e password sono obbligatori' });
    }

    try {
        // Recupera l'utente dall'email
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user || error) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // Verifica la password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // Genera il token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token valido per 1 ora
        });

        res.json({
            message: 'Login effettuato con successo',
            token,
            expiresIn: 3600, // 1 ora in secondi
        });
    } catch (err) {
        console.error('Errore durante il login:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

// Recupero del profilo utente
exports.getProfile = async (req, res) => {
    try {
        const { id } = req.user;

        // Recupera l'utente dal database
        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, role')
            .eq('id', id)
            .single();

        if (!user || error) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        res.json(user);
    } catch (err) {
        console.error('Errore durante il recupero del profilo:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, email, role, created_at');

        if (error) {
            console.error('Errore durante il recupero degli utenti:', error);
            return res.status(500).json({ message: 'Errore interno del server' });
        }

        res.json(users);
    } catch (err) {
        console.error('Errore durante il recupero degli utenti:', err);
        res.status(500).json({ message: 'Errore interno del server', error: err.message });
    }
};
