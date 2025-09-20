const express = require('express');
const { check } = require('express-validator');
const leadController = require('../controllers/leadController');

const router = express.Router();

// GET /api/v1/leads?page=1&limit=10&status=New&search=query
router.get('/', leadController.getAllLeads);

// GET /api/v1/leads/:id
router.get(
  '/:id',
  [
    check('id')
      .isMongoId()
      .withMessage('Invalid lead ID format'),
  ],
  leadController.getLead
);

// POST /api/v1/leads
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty().trim().escape(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('phone').optional().trim().escape(),
    check('status').optional().trim().escape(),
    check('source').optional().trim().escape(),
    check('assignedTo').optional().trim().escape(),
    check('company').optional().trim().escape(),
    check('title').optional().trim().escape(),
    check('notes').optional().trim().escape(),
  ],
  leadController.createLead
);

// PUT /api/v1/leads/:id
router.put(
  '/:id',
  [
    check('id').isMongoId().withMessage('Invalid lead ID format'),
    check('email').optional().isEmail().withMessage('Please include a valid email').normalizeEmail(),
    check('phone').optional().trim().escape(),
    check('status').optional().trim().escape(),
    check('source').optional().trim().escape(),
    check('assignedTo').optional().trim().escape(),
    check('company').optional().trim().escape(),
    check('title').optional().trim().escape(),
    check('notes').optional().trim().escape(),
  ],
  leadController.updateLead
);

// DELETE /api/v1/leads/:id
router.delete(
  '/:id',
  [
    check('id').isMongoId().withMessage('Invalid lead ID format'),
  ],
  leadController.deleteLead
);


module.exports = router;
