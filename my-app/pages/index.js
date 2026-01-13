// pages/index.js
import { useEffect, useState } from 'react';
import { fetchRandomQuote } from '../lib/quotesApi';
import { getDailyQuote, setDailyQuote, saveFavorite } from '../lib/storage';
import QuoteCard from '../components/QuoteCard';

function isSameDay(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth() &&
         d.getDate() === now.getDate();
}

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadNewQuote(saveAsDaily = false) {
    try {
      setLoading(true);
      setError('');
      const q = await fetchRandomQuote();
      setQuote(q);
      if (saveAsDaily) {
        setDailyQuote({ ...q, date: new Date().toISOString() });
      }
    } catch (e) {
      setError(e.message || 'Error fetching quote');
    } finally { setLoading(false); }
  }

  useEffect(() => {
    // check localStorage daily
    const daily = getDailyQuote();
    if (daily && isSameDay(daily.date)) {
      setQuote(daily);
    } else {
      loadNewQuote(true); // fetch and set as today's quote
    }
  }, []);


  const addToFavorites = (quote) => {
    fetch("http://localhost:5000/api/quotes/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("access_token")
      },
      body: JSON.stringify(quote)
    })
    .then(res => res.json())
    .then(data => console.log("Added to favorites:", data))
    .catch(err => console.error("Error adding to favorites:", err));
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Daily Quote</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <QuoteCard 
        quote={quote}
        onNext={() => loadNewQuote(false)}
        onFavorite={addToFavorites}
        onSetDaily={(q) => setDailyQuote({ ...q, date: new Date().toISOString() })}
      />
    </main>
  );
}
