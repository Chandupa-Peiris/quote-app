// pages/favorites.js
import { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../lib/storage';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [count, setCount] = useState(0)
  //useEffect(() => setFavorites(getFavorites()), []);

  useEffect(() => {
  fetch("http://localhost:5000/api/quotes/favorites", {
    headers: {
      Authorization: "JWT " + localStorage.getItem("access_token")
    }
  })
    .then(res => res.json())
    .then(data => setFavorites(data))
    .catch(err => console.error("Error fetching favorites:", err));
}, []);


  function increment(){
    setCount(
    prev=> prev + 1)
  }
  return (
    <main style={{ padding: 20 }}>
      <h1>Your Favorites</h1>
      {favorites.length === 0 && <p>No favorites yet.</p>}
      <ul>
        {favorites.map(f => (
          <li key={count}>
            “{f.quote}” — {f.author}
            <button onClick={() => { removeFavorite(f.quote); setFavorites(getFavorites()); }}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
