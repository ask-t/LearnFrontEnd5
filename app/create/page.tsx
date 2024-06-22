'use client'
import { useEffect, useState } from 'react';
import { QuoteService } from '../services/quoteService';
import { Quote } from '../models/Quote';

const PostQuotePage = () => {
  const [quote, setQuote] = useState<Quote>({ content: '', author: '', userid: ''});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      const response = await QuoteService.postQuote(quote);
      setSuccess('Quote posted successfully!');
      setError(null);
      setIsPopupOpen(false);
    } catch (error) {
      setError('Failed to post quote');
      setSuccess(null);
    }
  };

  return (
    <div>
      <button onClick={() => setIsPopupOpen(true)}>Post a Quote</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>X</button>
            <h2>Post a Quote</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Content:</label>
                <textarea
                  name="content"
                  value={quote.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Author:</label>
                <input
                  type="text"
                  name="author"
                  value={quote.author}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>UserID:</label>
                <input
                  type="text"
                  name="userid"
                  value={quote.userid}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <button type="submit">Post Quote</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </div>
        </div>
      )}

    </div>
  );
};

export default PostQuotePage;
