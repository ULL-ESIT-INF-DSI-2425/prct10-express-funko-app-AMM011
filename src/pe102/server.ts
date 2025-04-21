/**
 * @file server.ts
 * Punto de entrada del servidor Web Express. 
 */

import express from 'express';
import { readNote } from './note.js';

const app = express();
const PORT = 3000;

app.get('/notes', async (req, res) => {
    const title = req.query.title as string | undefined;
  
    // Validación de la query string
    if (!title) {
      res.status(400).json({ error: 'A title has to be provided' });
      return;
    }
  
    try {
      const response = await readNote(title);
      if (!response.success) {
        res.status(404).json({ error: 'No note was found' });
      } else {
        res.json(response);
      }
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });

