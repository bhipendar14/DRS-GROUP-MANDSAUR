import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function getStockQuote(symbol: string) {
  try {
    const response = await axios.get(`${BASE_URL}/quote`, {
      params: {
        symbol,
        token: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return null;
  }
}

export async function getMarketNews() {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        category: 'general',
        token: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market news:', error);
    return [];
  }
} 