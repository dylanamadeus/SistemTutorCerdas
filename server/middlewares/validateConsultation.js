const { body, validationResult } = require('express-validator');

const validateCreateConsultation = [
  body('consult_date')
    .notEmpty().withMessage('Consultation date is required')
    .isISO8601().withMessage('Invalid date format'),

  // Middleware ke-2 HARUS function
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUpdateStatus = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'approved', 'done', 'declined']).withMessage('Invalid status'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateCreateConsultation,
  validateUpdateStatus
};