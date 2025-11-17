const express = require('express');
const router = express.Router();

/**
 * Health Check Endpoint
 * GET /api/health
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

module.exports = router;
