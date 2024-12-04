const nodemailer = require('nodemailer');

// Configurazione del trasportatore Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Es. 'smtp.aruba.it'
    port: process.env.EMAIL_PORT || 465,
    secure: true, // Connessione sicura (SSL/TLS)
    auth: {
        user: process.env.EMAIL_USER, // Email dal file .env
        pass: process.env.EMAIL_PASS, // Password dal file .env
    },
});

// Funzione per inviare un'email
exports.sendEmail = async (to, subject, text, html = null) => {
    try {
        // Configurazione del contenuto dell'email
        const mailOptions = {
            from: `"FidIB" <${process.env.EMAIL_USER}>`, // Mittente
            to, // Destinatario
            subject, // Oggetto
            text, // Testo normale
            html, // HTML opzionale
        };

        // Invio dell'email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email inviata con successo: ${info.messageId}`);
        return { success: true, info };
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
        return { success: false, error };
    }
};
