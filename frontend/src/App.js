import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [newQuote, setNewQuote] = useState('');

  // Fonction pour récupérer une citation aléatoire
  const fetchQuote = () => {
    console.log('Récupération de la citation...');
    fetch('http://localhost:5000/quotes') // Utilise "http://localhost:5000/quotes" si tu n'es pas en Docker
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
      })
      .catch((err) => {
        console.error('Erreur de récupération de citation :', err);
      });
  };

  // Récupération automatique à l'affichage de la page
  useEffect(() => {
    fetchQuote();
  }, []);

  // Fonction pour ajouter une nouvelle citation
  const handleAddQuote = () => {
    if (newQuote.trim() === '') {
      console.log('Aucune citation à ajouter');
      return;
    }

    console.log('Ajout de la citation :', newQuote);
    fetch('http://localhost:5000/quotes', {  // Utilise "http://localhost:5000/quotes" si tu n'es pas en Docker
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quote: newQuote })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Citation ajoutée :', data);
        setNewQuote('');
        fetchQuote(); // Recharge une nouvelle citation après l'ajout
      })
      .catch((err) => {
        console.error('Erreur lors de l\'ajout de la citation :', err);
      });
  };

  // Fonction pour actualiser la citation sans modifier l'état actuel
  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    <div className="App" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Citation du jour</h1>
      <blockquote style={{ fontStyle: 'italic', margin: '1rem' }}>{quote}</blockquote>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleRefresh} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
          Actualiser
        </button>
        <button onClick={fetchQuote} style={{ padding: '0.5rem 1rem', margin: '1rem' }}>
          Nouvelle citation
        </button>
      </div>

      {/* Formulaire d'ajout */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Ajouter une citation</h2>
        <input
          type="text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Entrez une nouvelle citation"
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button
          onClick={handleAddQuote}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default App;

 



   