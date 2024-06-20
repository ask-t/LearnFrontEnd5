'use client'
import React, { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import {Quote} from "./models/Quote"
import {QuoteService} from './services/quoteService';


export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch quotes from the API
    const fetchQuotes = async () => {
      try{
        const data: Quote[] = await QuoteService.getQuotes();
        setQuotes(data);
      }
      catch{
        setError('Failed to fetch quotes');
      }
    };

    fetchQuotes(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once after the component mounts
if(error){
  return (<div>{error}</div>)
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      <div className="flex flex-wrap justify-center">
        {quotes.map(quote => (
          <QuoteCard key={quote._id} quote={quote} />
        ))}
      </div>
    </main>
  );
}
