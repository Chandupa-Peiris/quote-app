import { useEffect, useState } from 'react';
import { getDailyQuote } from "@/lib/storage";

export default function Daily() {
  const [dailyQuote, setDailyQuote] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This runs only in the browser, so localStorage is available
    const quote = getDailyQuote();
    setDailyQuote(quote);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  if (!dailyQuote) {
    return (
      <>
        <p>No daily quote set!</p>
      </>
    );
  }

  return (
    <>
      <h1>Today's Quote</h1>
      <p><strong>"{dailyQuote.quote}"</strong></p>
      <p>Author: {dailyQuote.author}</p>
    </>
  );
}