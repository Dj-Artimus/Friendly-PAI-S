import express from 'express'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cron from 'node-cron';

// This is needed to work with __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic' , 'image/heif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Invalid file type');
      error.status = 400;
      return cb(error, false);
    }
    cb(null, true);
  };

// Initialize multer for file uploads
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
  });

// Serve uploaded images as static files
express().use('/uploads', express.static(path.join(__dirname, '../uploads')));

export const UploadImage = async (req,res) => {
    try {
        if (req.file) {
          res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            path: `/uploads/${req.file.filename}`
          });
        } else {
          throw new Error('No file uploaded');
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };



// Cleanup function to delete old images
const deleteOldImages = () => {
  const uploadDir = path.join(__dirname, '../uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const now = Date.now();
    const expiryTime = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

    files.forEach(file => {
      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err);
          return;
        }

        // Check if the file is older than 48 hours
        if (now - stats.mtimeMs > expiryTime) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log(`Deleted old image: ${file}`);
            }
          });
        }
      });
    });
  });
};

// Schedule the cleanup task to run every hour
cron.schedule('0 * * * *', deleteOldImages);