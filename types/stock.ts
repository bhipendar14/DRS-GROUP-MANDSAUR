export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  weekHigh: number;
  weekLow: number;
  fiftyDayAvg: number;
  twoHundredDayAvg: number;
  avgVolume: number;
  pe: number | null;
  forwardPe: number | null;
  dividendYield: number | null;
  dataSource: string;
}

export interface StockResponse {
  stocks: Stock[];
  lastUpdated: string;
  source: string;
  error?: string;
} 