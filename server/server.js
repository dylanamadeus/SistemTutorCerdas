import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
const app = express();
import pkg from './models/index.js';
const { sequelize } = pkg;
import materialRoutes from './routes/materialRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tutorRoutes from "./routes/tutorRoutes.js";


// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/materials', materialRoutes);
app.use(cookieParser());
console.log("Tutor route loaded ✅");
app.use("/tutor", tutorRoutes);



// Root route
app.get('/', (req, res) => {
  res.json({ 'message' : 'HALLO FROM EXPRESS!!!'});
});

// Routes
app.use(routes);

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Test connection to database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected ✅');
  })
  .catch(err => {
    console.error('Database connection error ❌:', err);
  });

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

