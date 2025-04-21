require('dotenv').config();
import express from 'express';
import { json } from 'body-parser';
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});


const app = express();
app.use(json());

app.get('/', (req, res) => {res.send('Welcome to the Flashcard API!')});
// Create a folder
app.post('/folders', async (req, res) => {
  const { name, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO folders (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating folder:', err);
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

// Delete a folder (and cascade delete its cards)
app.delete('/folders/:id', async (req, res) => {
  const folderId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM folders WHERE id = $1 RETURNING *', [folderId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Folder not found' });
    } else {
      res.status(200).json({ message: 'Folder deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting folder:', err);
    res.status(500).json({ error: 'Failed to delete folder' });
  }
});

// Create a card using folder name
app.post('/cards', async (req, res) => {
  const { folder_name, front, back } = req.body;

  try {
    // Find the folder ID by folder name
    const folderResult = await pool.query('SELECT id FROM folders WHERE name = $1', [folder_name]);
    if (folderResult.rowCount === 0) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    const folderId = folderResult.rows[0].id;

    // Insert the card into the cards table
    const result = await pool.query(
      'INSERT INTO cards (folder_id, front, back) VALUES ($1, $2, $3) RETURNING *',
      [folderId, front, back]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating card:', err);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// Delete a card
app.delete('/cards/:id', async (req, res) => {
  const cardId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM cards WHERE id = $1 RETURNING *', [cardId]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Card not found' });
    } else {
      res.status(200).json({ message: 'Card deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting card:', err);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});