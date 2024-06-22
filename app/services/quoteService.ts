import { Quote } from '../models/Quote';

const API_URL = 'http://localhost:8080/api';
export class QuoteService
{
  static async getQuotes(): Promise<Quote[]>
  {
    try
    {
      const response = await fetch(`${API_URL}/quote`);
      if (!response.ok)
      {
        throw new Error('Failed to fetch quotes');
      }
      const data: Quote[] = await response.json();
      return data;
    }
    catch(error)
    {
      console.error("Error fetching quotes:", error);
      return [];
    }
  }

  static async postQuote(quote: Quote): Promise<Quote | null>
  {
    console.log("quote ", quote);
    console.log("JWT ", localStorage.getItem('user'))
    try
    {
      const response = await fetch(`${API_URL}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('user') || '',
        },
        body: JSON.stringify(quote),
      });
      if (!response.ok)
      {
        throw new Error('Failed to create quote');
      }
      const data: Quote = await response.json();
      return data;
    }
    catch(error)
    {
      console.error("Error creating quote:", error);
      return null;
    }
  }
}
