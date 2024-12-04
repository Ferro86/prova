const supabase = require('@supabase/supabase-js').createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
const nodemailer = require('nodemailer');

// Configura il trasportatore Nodemailer con variabili d'ambiente
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Es. 'smtp.aruba.it'
    port: process.env.EMAIL_PORT || 465,
    secure: true, // Utilizza connessione sicura
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendNotification = async (req, res) => {
    const { userId, subject, message } = req.body;

    try {
        // Recupera l'email dell'utente da Supabase
        const { data: user, error } = await supabase
            .from('users')
            .select('email')
            .eq('id', userId)
            .single();

        if (!user || error) return res.status(404).json({ message: 'User not found' });

        // Configura l'email
        const mailOptions = {
            from: `"FidIB" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject,
            text: message,
            html: `<p>${message}</p>`,
        };

        // Invia l'email
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};

exports.getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Recupera le notifiche dell'utente
        const { data: notifications, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId);

        if (error) return res.status(500).json({ message: 'Error fetching notifications', error });

        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};
