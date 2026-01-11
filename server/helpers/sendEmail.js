require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text, htmlContent) {
  console.log('📩 sendEmail function called'); // log untuk debug

  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Anda bisa menggunakan layanan email lain jika diperlukan
    auth: {
      user: process.env.EMAIL_USER,  // Email pengirim yang disimpan di .env
      pass: process.env.EMAIL_PASS   // Password email pengirim yang disimpan di .env
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,   // Email pengirim
    to,                            // Email penerima
    subject,                       // Subjek email
    text,                          // Teks alternatif jika HTML tidak didukung
    html: htmlContent              // Konten HTML untuk email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

module.exports = sendEmail;  // Pastikan fungsi diekspor dengan benar