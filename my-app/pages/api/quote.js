export default async function handler(req, res) {
  try {
    const r = await fetch('https://zenquotes.io/api/random');
    if (!r.ok) return res.status(502).json({ error: 'Upstream error' });
    const data = await r.json();
    const item = Array.isArray(data) ? data[0] : data;
    const out = {
      quote: item.q ?? item.quote ?? "",
      author: item.a ?? item.author ?? "Unknown"
    };
    return res.status(200).json(out);
  } catch (err) {
    console.error('API route error:', err);
    return res.status(500).json({ error: 'Failed to fetch quote' });
  }
}