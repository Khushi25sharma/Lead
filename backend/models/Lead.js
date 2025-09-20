const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Cancelled', 'Confirmed'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Referral', 'Social Media', 'Advertisement', 'Email', 'Other'],
      default: 'Website',
    },
    notes: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    assignedTo: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// unique email
leadSchema.index({ email: 1 }, { unique: true });


// add text index for search
leadSchema.index({ name: 'text', email: 'text', phone: 'text', notes: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
