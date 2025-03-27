import { NextResponse } from 'next/server'
import axios from 'axios'

// Use environment variable for API key
const API_KEY = process.env.FMP_API_KEY || "HVU2QHBsgabbRTwG8p6d11EPjE6yHEPm"

// Common stock symbols that should always work
const COMMON_SYMBOLS = {
  "INTC": {
    name: "Intel Corporation",
    sector: "Technology",
    exchange: "NASDAQ"
  },
  "AAPL": {
    name: "Apple Inc.",
    sector: "Technology",
    exchange: "NASDAQ"
  },
  "MSFT": {
    name: "Microsoft Corporation",
    sector: "Technology",
    exchange: "NASDAQ"
  },
  "GOOGL": {
    name: "Alphabet Inc.",
    sector: "Technology",
    exchange: "NASDAQ"
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('symbol')?.trim() || ''
  
  if (!query) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }
  
  // Check for common symbol matches case-insensitively
  const upperQuery = query.toUpperCase()
  for (const [symbol, info] of Object.entries(COMMON_SYMBOLS)) {
    if (symbol === upperQuery || info.name.toUpperCase().includes(upperQuery)) {
      query = symbol // Use the known symbol
      break
    }
  }
  
  try {
    // First try with exact symbol match for known symbols
    if (COMMON_SYMBOLS[query.toUpperCase()]) {
      const stockData = await getStockData(query.toUpperCase())
      if (stockData) {
        return NextResponse.json(stockData)
      }
    }
    
    // Then try search API
    const searchUrl = `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(query)}&limit=10&apikey=${API_KEY}`
    const searchRes = await axios.get(searchUrl).catch(() => ({ data: [] }))
    
    // No matches found
    if (!searchRes.data || searchRes.data.length === 0) {
      return NextResponse.json({ 
        error: `No matches found for "${query}"`,
        suggestions: ["AAPL", "MSFT", "GOOGL", "INTC", "AMZN"]
      }, { status: 404 })
    }
    
    // Get the best match
    const bestMatch = searchRes.data[0]
    const symbol = bestMatch.symbol
    
    // Try to get stock data for this symbol
    const stockData = await getStockData(symbol)
    if (stockData) {
      return NextResponse.json(stockData)
    }
    
    // Fallback to basic data if we couldn't get full data
    return NextResponse.json({
      id: symbol,
      name: bestMatch.name || symbol,
      symbol: symbol,
      sector: bestMatch.exchange || "N/A",
      marketCap: "N/A",
      currentPrice: 0,
      dayChange: 0,
      dayChangePercentage: 0,
      volume: "N/A",
      pe: 0,
      eps: 0,
      revenue: "N/A",
      netProfit: "N/A",
      yoyGrowth: 0,
      quarterlyData: {
        dates: [],
        prices: [],
        volumes: [],
        revenue: [],
        profit: []
      }
    })
    
  } catch (error) {
    console.error(`Error in stock API:`, error)
    return NextResponse.json({ 
      error: 'Failed to fetch stock data', 
      suggestions: ["AAPL", "MSFT", "GOOGL", "INTC", "AMZN"]
    }, { status: 500 })
  }
}

// Helper function to get full stock data
async function getStockData(symbol) {
  try {
    const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
    const quoteUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`
    const historicalUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY}`
    const financialsUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=4&apikey=${API_KEY}`
    
    const [profileRes, quoteRes, historicalRes, financialsRes] = await Promise.all([
      axios.get(profileUrl).catch(() => ({ data: [] })),
      axios.get(quoteUrl).catch(() => ({ data: [] })),
      axios.get(historicalUrl).catch(() => ({ data: { historical: [] } })),
      axios.get(financialsUrl).catch(() => ({ data: [] }))
    ])
    
    // If we have common data about this symbol, use it as fallback
    const fallbackInfo = COMMON_SYMBOLS[symbol] || {}
    
    const profile = profileRes.data?.[0] || {}
    const quote = quoteRes.data?.[0] || {}
    const historical = historicalRes.data || { historical: [] }
    const financials = financialsRes.data || []

    // Calculate YoY growth if financials are available
    let yoyGrowth = 0
    if (financials.length >= 2) {
      const currentRevenue = financials[0].revenue || 0
      const previousRevenue = financials[1].revenue || 0
      if (previousRevenue > 0) {
        yoyGrowth = ((currentRevenue - previousRevenue) / previousRevenue) * 100
      }
    }
    
    return {
      id: symbol,
      name: profile.companyName || fallbackInfo.name || symbol,
      symbol: symbol,
      sector: profile.sector || fallbackInfo.sector || "N/A",
      marketCap: formatCurrency(profile.mktCap || 0),
      currentPrice: quote.price || 0,
      dayChange: quote.change || 0,
      dayChangePercentage: quote.changesPercentage || 0,
      volume: formatVolume(quote.volume || 0),
      pe: quote.pe || 0,
      eps: quote.eps || 0,
      revenue: formatCurrency(profile.revenue || 0),
      netProfit: formatCurrency(financials.length > 0 ? (financials[0].netIncome || 0) : 0),
      yoyGrowth: parseFloat(yoyGrowth.toFixed(2)) || 0,
      quarterlyData: processHistoricalData(historical)
    }
  } catch (error) {
    console.error(`Error getting data for ${symbol}:`, error)
    return null
  }
}

// Format currency values
function formatCurrency(value) {
  if (!value) return "N/A"
  
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e7) return `$${(value / 1e7).toFixed(2)}Cr`
  if (value >= 1e5) return `$${(value / 1e5).toFixed(2)}L`
  return `$${value.toLocaleString('en-IN')}`
}

// Format volume values
function formatVolume(value) {
  if (!value) return "N/A"
  
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`
  return value.toString()
}

// Process historical data
function processHistoricalData(data) {
  if (!data.historical || !data.historical.length) {
    return {
      dates: [],
      prices: [],
      volumes: [],
      revenue: [],
      profit: []
    }
  }
  
  // Get the most recent 180 days of data
  const historicalData = data.historical.slice(0, 180).reverse()
  
  const dates = historicalData.map(item => {
    const date = new Date(item.date)
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  })
  
  const prices = historicalData.map(item => item.close)
  const volumes = historicalData.map(item => item.volume)
  
  return {
    dates,
    prices,
    volumes,
    revenue: Array(dates.length).fill(0),
    profit: Array(dates.length).fill(0)
  }
} 