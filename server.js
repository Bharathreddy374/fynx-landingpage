import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;
const allowedOrigins = [
  'https://fynx-landingpage.vercel.app',
  'https://www.getfynxx.in'
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(express.json());
app.use(cors(corsOptions));




const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

// Endpoint to get the waitlist count
app.get('/api/waitlist/count', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM waitlist;');
    const count = parseInt(result.rows[0].count, 10);
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    res.status(500).json({ success: false, message: 'Failed to get waitlist count.' });
  }
});


app.post('/api/waitlist', async (req, res) => {
  const {
    name,
    email,
    platform,
    instagram_username,
    instagram_followers,
    youtube_channel_name,
    youtube_subscribers
  } = req.body;

  try {
    // Check for duplicate email or Instagram username
    const checkQuery = `
      SELECT email, instagram_username FROM waitlist WHERE email = $1 OR (instagram_username IS NOT NULL AND instagram_username = $2 AND $2 IS NOT NULL AND $2 != '');
    `;
    const checkValues = [email, instagram_username];
    const { rows } = await pool.query(checkQuery, checkValues);

    if (rows.length > 0) {
      const existing = rows[0];
      const message = existing.email === email
        ? 'This email address is already on the waitlist.'
        : 'This Instagram username is already on the waitlist.';
      return res.status(409).json({ success: false, message });
    }

    const insertQuery = `
      INSERT INTO waitlist (name, email, platform, instagram_username, instagram_followers, youtube_channel_name, youtube_subscribers)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const insertValues = [
      name,
      email,
      platform,
      instagram_username || null,
      instagram_followers ? parseInt(instagram_followers.toString().replace(/,/g, ''), 10) : null,
      youtube_channel_name || null,
      youtube_subscribers ? parseInt(youtube_subscribers.toString().replace(/,/g, ''), 10) : null
    ];

    const result = await pool.query(insertQuery, insertValues);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into database:', error);
    res.status(500).json({ success: false, message: 'Failed to join waitlist.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
