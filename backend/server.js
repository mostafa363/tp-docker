const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Pour lire les données JSON envoyées en POST

let quotes = [
  "La simplicité est la sophistication suprême.",
  "L'échec est simplement l'opportunité de recommencer, cette fois de manière plus intelligente.",
  "Ce qui ne nous tue pas nous rend plus fort."
];

// GET /quotes – citation aléatoire
app.get('/quotes', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// POST /quotes – ajouter une citation
app.post('/quotes', (req, res) => {
  const newQuote = req.body.quote;
  if (newQuote) {
    quotes.push(newQuote);
    res.status(201).json({ message: 'Citation ajoutée', quote: newQuote });
  } else {
    res.status(400).json({ message: 'Aucune citation fournie' });
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
