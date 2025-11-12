// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Waitlist from './models/Waitlist.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://localhost:8080',
  'https://fynx-landingpage.vercel.app',
  'https://www.getfynxx.in',
  'https://getfynxx.in'
]);

const corsOptions = {
  origin: function (origin, callback) {
    const safeNoOrigin = !origin || origin === 'null'; // Postman/cURL/SSR/file://
    const allowed = safeNoOrigin || allowedOrigins.has(origin);

    console.log('Request Origin header:', origin ?? '(no origin header)');
    if (allowed) return callback(null, true);

    console.log('❌ Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};


app.use(express.json());

app.use(cors(corsOptions));
app.use((req, res, next) => {
  const o = req.headers.origin ?? '(no origin)';
  const r = req.headers.referer ?? '(no referer)';
  console.log(`[${req.method}] ${req.path} | Origin: ${o} | Referer: ${r} | UA: ${req.headers['user-agent']}`);
  next();
});

// Local MongoDB URI (change DB name if you want)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/landing-page-fynxx';

// Connect to MongoDB with Mongoose
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URI}`))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Helper: parse number-like fields (removes commas, returns Number or null)
function parseNumberField(val) {
  if (val === undefined || val === null || val === '') return null;
  const cleaned = String(val).replace(/,/g, '').trim();
  const parsed = parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

// GET waitlist count
app.get('/api/waitlist/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    res.status(500).json({ success: false, message: 'Failed to get waitlist count.' });
  }
});

// POST join waitlist
app.post('/api/waitlist', async (req, res) => {
  const {
    name,
    email,
    phno,
    platform,
    instagram_username,
    instagram_followers,
    youtube_channel_name,
    youtube_subscribers
  } = req.body;

  try {
    // Normalize empty strings
    const instaUser = instagram_username && instagram_username !== '' ? instagram_username.trim() : null;
    const ytName = youtube_channel_name && youtube_channel_name !== '' ? youtube_channel_name.trim() : null;

    // Check duplicates: email OR instagram_username (if provided)
    const query = { $or: [{ email: email }] };
    if (instaUser) query.$or.push({ instagram_username: instaUser });

    const existing = await Waitlist.findOne(query).lean();

    if (existing) {
      let message = 'Entry already exists on the waitlist.';
      if (existing.email === email) message = 'This email address is already on the waitlist.';
      else if (instaUser && existing.instagram_username === instaUser) message = 'This Instagram username is already on the waitlist.';
      return res.status(409).json({ success: false, message });
    }

    const doc = {
      name: name || null,
      email: email || null,
      phno: phno || null,
      platform: platform || null,
      instagram_username: instaUser,
      instagram_followers: parseNumberField(instagram_followers),
      youtube_channel_name: ytName,
      youtube_subscribers: parseNumberField(youtube_subscribers)
    };

    const created = await Waitlist.create(doc);

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Error inserting into database:', error);

    // Duplicate key error (race conditions or parallel requests)
    if (error.code === 11000) {
      const dupKey = error.keyPattern ? Object.keys(error.keyPattern)[0] : Object.keys(error.keyValue || {})[0];
      let message = 'Duplicate entry.';
      if (dupKey === 'email') message = 'This email address is already on the waitlist.';
      else if (dupKey === 'instagram_username') message = 'This Instagram username is already on the waitlist.';
      return res.status(409).json({ success: false, message });
    }

    res.status(500).json({ success: false, message: 'Failed to join waitlist.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
