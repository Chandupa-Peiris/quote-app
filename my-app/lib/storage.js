// lib/storage.js
const LS_DAILY = 'dq_daily';
const LS_FAVORITES = 'dq_favorites';
const LS_HISTORY = 'dq_history';

export function getDailyQuote() {
  try {
    const raw = localStorage.getItem(LS_DAILY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setDailyQuote(obj) {
  localStorage.setItem(LS_DAILY, JSON.stringify(obj));
}

export function getFavorites() {
  try {
    const raw = localStorage.getItem(LS_FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveFavorite(quote) {
  const list = getFavorites();
  const exists = list.some(q => q.quote === quote.quote);
  if (!exists) {
    list.unshift(quote);
    localStorage.setItem(LS_FAVORITES, JSON.stringify(list));
  }
}

export function removeFavorite(Quote) {
  const list = getFavorites().filter(q => q.quote !== Quote);
  localStorage.setItem(LS_FAVORITES, JSON.stringify(list));
}
