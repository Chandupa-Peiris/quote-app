
export default function QuoteCard({ quote = {}, onNext = () => {}, onFavorite = () => {}, onSetDaily = () => {} }) {
  const quoteText = quote?.quote ?? quote?.text ?? quote?.q ?? "";
  const quoteAuthor = quote?.author ?? quote?.a ?? "Unknown";

  return (
    <div className="Quote-Card">
      <p className="Quote-text">{quoteText}</p>
      <p className="Quote-author">{quoteAuthor}</p>

      <div className="Quote-controls">
        <button onClick={onNext}>Next Quote</button>
        <button onClick={() => onFavorite(quote)}>Favourite</button>
        <button onClick={() => onSetDaily(quote)}>Set as Daily</button>
      </div>
    </div>
  );
}