const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ambil token dari header Authorization: Bearer <token>
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // (Optional) Bisa tambahkan dukungan ambil token dari cookie kalau mau
  // const cookieToken = req.cookies?.token;
  // if (!token && cookieToken?.startsWith('Bearer ')) {
  //   token = cookieToken.split(' ')[1];
  // }

  // Kalau tidak ada token sama sekali
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debug log (boleh hapus di production)
    console.log('Decoded token:', decoded);

    // Simpan payload JWT ke req.user
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Token error:', error.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;