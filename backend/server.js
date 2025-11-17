/**
 * Legal CRM - Document Processing Server
 *
 * This server handles:
 * 1. File uploads (single files & ZIP archives)
 * 2. Document text extraction (PDF, DOCX, TXT, OCR for scanned PDFs)
 * 3. LLM-based document classification and extraction
 * 4. Translation, summarization, and insight generation
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

// Import routes
const uploadRoutes = require('./routes/upload');
const processRoutes = require('./routes/process');
const healthRoutes = require('./routes/health');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Create required directories
const dirs = [
  process.env.UPLOAD_DIR || './uploads',
  process.env.TEMP_DIR || './temp',
  './outputs',
  './logs'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Response compression
app.use(morgan('combined')); // Logging

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/process', processRoutes);

// Serve static files (uploaded documents - in production, use CDN/S3)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds maximum allowed limit'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      error: 'Unexpected file field'
    });
  }

  // CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'CORS policy: Origin not allowed'
    });
  }

  // Generic error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('┌─────────────────────────────────────────────────────┐');
  console.log('│   Legal CRM - Document Processing Server           │');
  console.log('└─────────────────────────────────────────────────────┘');
  console.log(`\n✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ LLM Model: ${process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'}`);
  console.log(`✓ OCR Enabled: ${process.env.ENABLE_OCR || 'true'}`);
  console.log(`✓ Max File Size: ${process.env.MAX_FILE_SIZE_MB || 50}MB`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  - Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  - Upload File:  http://localhost:${PORT}/api/upload/single`);
  console.log(`  - Upload ZIP:   http://localhost:${PORT}/api/upload/zip`);
  console.log(`  - Process Doc:  http://localhost:${PORT}/api/process/document`);
  console.log('\n' + '─'.repeat(53) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;
