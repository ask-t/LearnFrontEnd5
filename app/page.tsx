'use client'
import React, { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import { Quote } from "./models/Quote";
import { QuoteService } from './services/quoteService';

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quote, setQuote] = useState<Quote>({ content: '', author: '', userid: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    // Function to fetch quotes from the API
    const fetchQuotes = async () => {
      try {
        const data: Quote[] = await QuoteService.getQuotes();
        setQuotes(data);
      } catch {
        setError('Failed to fetch quotes');
      }
    };

    fetchQuotes(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  useEffect(() => {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userid');
    if (userId) {
      setQuote((prevQuote) => ({ ...prevQuote, userid: userId }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuote({ ...quote, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await QuoteService.postQuote(quote);
      setSuccess('Quote posted successfully!');
      setError(null);
      setIsPopupOpen(false);

      // Reset the form
      setQuote({ content: '', author: '', userid: quote.userid });

      // Reload quotes
      const data: Quote[] = await QuoteService.getQuotes();
      setQuotes(data);
    } catch (error) {
      setError('Failed to post quote');
      setSuccess(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gray-100">
      {isLoggedIn  &&(<button
        onClick={() => setIsPopupOpen(true)}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Post a Quote
      </button> )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Post a Quote</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Content:</label>
                <textarea
                  name="content"
                  value={quote.content}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={quote.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">UserID:</label>
                <input
                  type="text"
                  name="userid"
                  value={quote.userid}
                  onChange={handleInputChange}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Post Quote
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
          </div>
        </div>
      )}

      {!isPopupOpen && isLoggedIn && (<div className="w-full max-w-2xl h-full overflow-y-auto bg-white rounded-lg shadow-md p-4">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {quotes.map(quote => (
          <QuoteCard key={quote._id} quote={quote} />
        ))}
      </div> )}
    </main>
  );
}