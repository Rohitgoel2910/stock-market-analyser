export async function getStockHistory(symbol) {
    const API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;
    const BASE_URL = "https://api.twelvedata.com";
  
    try {
      const response = await fetch(
        `${BASE_URL}/time_series?symbol=${symbol}&interval=5min&outputsize=20&apikey=${API_KEY}`
      );
      const data = await response.json();
  
      if (data.status === "error" || !data.values) {
        return null;
      }
  
      return data.values.reverse(); // Reverse for correct order (oldest to newest)
    } catch (error) {
      console.error("Error fetching stock history:", error);
      return null;
    }
  }
  