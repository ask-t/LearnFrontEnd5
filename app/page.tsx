import React from "react";
import QuoteCard from "./components/QuoteCard";

export default function Home() {

  const quotes = [
    {
      "_id": "666939747bc68f5491945e5e",
      "content": "Innovation is the ability to see change as an opportunity – not a threat.",
      "category": "general",
      "author": "Steve Jobs",
      "userid": "johndoe123",
      "likes": [],
      "__v": 0
    },
    {
      "_id": "666939917bc68f5491945e61",
      "content": "The only way to do great work is to love what you do.",
      "category": "general",
      "author": "Steve Jobs",
      "userid": "johndoe123",
      "likes": [],
      "__v": 0
    },
    {
      "_id": "666939997bc68f5491945e64",
      "content": "Your time is limited, don't waste it living someone else's life.",
      "category": "general",
      "author": "Steve Jobs",
      "userid": "johndoe123",
      "likes": [],
      "__v": 0
    },
    {
      "_id": "666939a37bc68f5491945e67",
      "content": "Being the richest man in the cemetery doesn't matter to me. Going to bed at night saying we've done something wonderful, that's what matters to me.",
      "category": "general",
      "author": "Steve Jobs",
      "userid": "johndoe123",
      "likes": [],
      "__v": 0
    }
    // Add more quote objects here as needed
  ];
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
