
export async function fetchRandomQuote() {
  const res = await fetch('/api/quote');
  if (!res.ok) throw new Error('Can not fetch the data');
  return await res.json();
}

// export async function fetchAllQuotes(){
//     const res = await fetch('https://type.fit/api/quotes');
//     if (!res.ok) throw new Error("Can not fetch data");
//     const arr = await res.json();
//     quotes = arr.map((q,i)=>({quote:q.text , author: q.author || 'Unknown', id:idx }));
//     return  quotes;
// }