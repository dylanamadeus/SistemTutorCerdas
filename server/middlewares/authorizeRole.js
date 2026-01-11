function authorizeRole(roles) {
  return (req, res, next) => {
    // Cek dulu apakah user sudah di-authenticate
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    // Pastikan role ada dan valid string
    const userRole = req.user.role;
    if (!userRole || typeof userRole !== "string") {
      return res.status(403).json({ message: "Forbidden: Invalid user role" });
    }

    // Ubah ke lowercase (opsional kalau role kamu konsisten lowercase di DB/token)
    const userRoleLower = userRole.toLowerCase();

    console.log("AuthorizeRole - User role:", userRoleLower);
    console.log("AuthorizeRole - Allowed roles:", roles);

    // Cek apakah role user termasuk di roles yang diizinkan
    if (!roles.includes(userRoleLower)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You are not authorized" });
    }

    // Kalau lolos semua, lanjut ke next()
    next();
  };
}

module.exports = { authorizeRole };
