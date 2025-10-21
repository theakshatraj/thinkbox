const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  ownerId: { type: String, required: true }, // User ID
  folderId: { type: String, default: null }, // For folder organization
  isPublic: { type: Boolean, default: false },
  shareToken: { type: String, unique: true, sparse: true },
  aiStatus: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  aiTags: [{ type: String }],
  aiSummary: { type: String },
  uploadDate: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);