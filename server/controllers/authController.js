const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../helpers/sendEmail');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      isVerified: false
    });

    // Generate token verifikasi
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Kirim email verifikasi dengan tampilan HTML
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 15px;
              background-color: #FAB12F;
              color: #fff;
              border-radius: 8px 8px 0 0;
            }
            h1 {
              font-size: 24px;
              margin: 0;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
              margin: 10px 0;
            }
            .btn {
              display: inline-block;
              background-color: #FAB12F;
              color: #fff;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              margin-top: 30px;
            }
            .footer a {
              color: #FAB12F;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>E-mail Verifikasi</h1>
            </div>
            <div class="content">
              <p>Haloo,</p>
              <p>Terima kasih telah mendaftar ke LMS!</p>
              <p>Silahkan klik tombol di bawah ini untuk melakukan verifikasi alamat e-mail Anda dan menyelesaikan proses pendaftaran :</p>
              <a href="http://localhost:5000/auth/verify?token=${token}" class="btn" style="color: #ffffff">Verify Your Email</a>
            </div>
            <div class="footer">
              <p>Jika kamu tidak melakukan pendaftaran pada LMS, tolong abaikan e-mail ini.</p>
              <p>Salam hangat,<br/>Dylan Amadeus</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Kirim email
    await sendEmail(email, 'Verifikasi E-mail Anda', 'Silahkan Verifikasi E-mail Anda.', htmlContent);

    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    console.error('❌ Error in register controller:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};  

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Cek apakah email sudah diverifikasi
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.verifyEmail = async (req, res) => {
    try {
      const { token } = req.query;
  
      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Cari user dari token
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Update status isVerified
      user.isVerified = true;
      await user.save();
  
      // res.status(200).json({ message: 'Email verified successfully. You can now login.' });
      return res.redirect('http://localhost:3000/masuk');
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  };

  exports.logout = async (req, res) => {
    try {
      // Karena JWT sifatnya stateless, kita hanya kasih response sukses
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      await sendEmail(
        email,
        'Reset Your Password - LMS',
        `Hello,
  
  We received a request to reset your password.
  
  Please click the link below to reset your password:
  
  http://localhost:3000/auth/reset-password?token=${token}
  
  If you did not request a password reset, please ignore this email.
  
  Best regards,
  Dylan Amadeus`
      );
  
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
    res.status(200).json({ message: 'If this email is registered, a password reset link has been sent.' });
  };
  
  exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Token has expired. Please request a new password reset.' });
      }
  
      console.error(error);
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  };
  
  

  exports.resendVerification = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.isVerified) {
        return res.status(400).json({ message: 'Email is already verified' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      await sendEmail(
        email,
        'Resend Verification - LMS',
        `Hello,
  
  We noticed you haven't verified your email yet.
  
  Please click the link below to verify your email:
  
  http://localhost:3000/auth/verify?token=${token}
  
  If you did not register, please ignore this email.
  
  Best regards,
  Dylan Amadeus`
      );
  
      res.status(200).json({ message: 'Verification email resent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };