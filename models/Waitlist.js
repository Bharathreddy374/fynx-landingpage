// models/Waitlist.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const WaitlistSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    lowercase: true
  },
  phno: {
    type: String,
    trim: true,
    required: [true, 'Phone number is required']
  },
  platform: {
    type: String,
    trim: true,
    default: null
  },
  instagram_username: {
    type: String,
    trim: true,
    default: null
  },
  instagram_followers: {
    type: Number,
    default: null
  },
  youtube_channel_name: {
    type: String,
    trim: true,
    default: null
  },
  youtube_subscribers: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Indexes
// Unique on email
WaitlistSchema.index({ email: 1 }, { unique: true });
// Sparse unique index on instagram_username so multiple nulls allowed but duplicates blocked
WaitlistSchema.index({ instagram_username: 1 }, { unique: true, sparse: true });

export default mongoose.models.Waitlist || mongoose.model('Waitlist', WaitlistSchema);
