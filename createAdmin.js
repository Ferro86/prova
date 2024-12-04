require('dotenv').config();
const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
const bcrypt = require('bcrypt');


async function createAdmin() {
    const email = 'admin@inbroker.it'; // Modifica con l'email desiderata
    const password = '@88Ts41fr'; // Modifica con la password desiderata
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const { data, error } = await supabase
            .from('users')
            .insert({
                email,
                password: hashedPassword,
                role: 'admin',
            })
            .single();

        if (error) throw error;

        console.log('Admin creato con successo:', data);
    } catch (err) {
        console.error('Errore durante la creazione dell\'admin:', err);
    }
}

createAdmin();
