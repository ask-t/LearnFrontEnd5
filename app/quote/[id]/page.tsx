'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quote } from '../../models/Quote';
import { QuoteService } from '../../services/quoteService';

const QuotePage = ({ params }: { params: { id: string } }) => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchQuote = async () => {
        try {
          const data = await QuoteService.getQuoteById(id);
          setQuote(data);
          setContent(data.content);
        } catch (error) {
          setError('Failed to fetch quote');
        }
      };

      fetchQuote();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setContent(quote?.content || '');
  };

  const handleSaveEdit = async () => {
    if (quote) {
      try {
        const updatedQuote = { ...quote, content };
        await QuoteService.updateQuote(updatedQuote);
        setQuote(updatedQuote);
        setIsEditing(false);
      } catch (error) {
        setError('Failed to update quote');
      }
    }
  };

  const handleDelete = async () => {
    if (quote) {
      try {
        await QuoteService.deleteQuote(id);
        router.push('/');
      } catch (error) {
        setError('Failed to delete quote');
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!quote) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        {isEditing ? (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{quote.content}</h2>
            <p className="text-lg text-gray-600 mb-2">- {quote.author}</p>
            <p className="text-sm text-gray-500">@{quote.userid}</p>
            <p className="text-sm text-gray-500 mt-4">Category: #{quote.category}</p>
            <div className="mt-6 flex items-center justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Like
              </button>
              <span className="text-gray-600">{quote.likes?.length} Likes</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuotePage;
