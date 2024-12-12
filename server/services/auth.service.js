import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  // Login user
  login: async (username, password) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user.toObject();
      return { user: userWithoutPassword, token };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  // Get user profile
  getProfile: async (userId) => {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching profile: ${error.message}`);
    }
  },
};