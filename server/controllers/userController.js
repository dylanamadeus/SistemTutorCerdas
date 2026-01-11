const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET semua user (admin & teacher)
exports.getAllUsers = async (req, res) => {
  const requester = req.user;

  try {
    let users;

    if (requester.role === 'admin') {
      // Admin lihat semua
      users = await User.findAll();
    } else if (requester.role === 'teacher') {
      // Teacher lihat semua kecuali admin
      users = await User.findAll({
        where: {
          role: {
            [Op.notIn]: ['admin', 'teacher']
          }
        }
      });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// GET detail user by id (admin, teacher, student)
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const requester = req.user; // dari authMiddleware

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // student cuma boleh lihat profil sendiri
    if (requester.role === 'student' && requester.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // teacher tidak boleh lihat data admin
    if (requester.role === 'teacher' && (user.role === 'admin' || user.role === 'teacher') && requester.id !== user.id) {
      return res.status(403).json({ message: 'You are not authorized to access this user' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};


// POST create user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// PUT update user by id
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const requester = req.user;
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Student hanya bisa update data dirinya sendiri
    if (requester.role === 'student' && requester.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Teacher hanya bisa update student, kecuali kalau id-nya sendiri boleh
    // if (requester.role === 'teacher') {
    //   if (user.id !== requester.id && (user.role === 'admin' || user.role === 'teacher')) {
    //     return res.status(403).json({ message: 'You are not authorized to update this user' });
    //   }

    //   // Cegah update role
    //   if (role) {
    //     return res.status(403).json({ message: 'You are not authorized to change user role' });
    //   }
    // }

    // Update allowed fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Admin bisa update role
    if ((requester.role === 'admin' || requester.role === 'teacher') && role) {
      user.role = role;
    }

    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};


// DELETE user by id
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const requester = req.user;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // admin bebas hapus siapa saja
    if (requester.role === 'admin') {
      await user.destroy();
      return res.json({ message: 'User deleted successfully' });
    }

    // teacher hanya boleh hapus student
    if (requester.role === 'teacher') {
      if (user.role !== 'student') {
        return res.status(403).json({ message: 'Teacher can only delete students' });
      }
      await user.destroy();
      return res.json({ message: 'Student deleted successfully' });
    }

    // student gak boleh hapus siapa-siapa
    return res.status(403).json({ message: 'Access denied' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// GET user login saat ini (profil sendiri)
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'isVerified']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching current user', error: error.message });
  }
};