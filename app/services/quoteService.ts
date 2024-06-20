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
}
