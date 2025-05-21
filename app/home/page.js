"use client"
import { useEffect, useState } from "react";
import { getStockHistory } from "@/utils/fetchStockData";
import StockChart from "@/componets/StockChart";
import Chatbot from "../api/chatbot";


export default function Home() {
  const [symbol, setSymbol] = useState(""); 
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);


  const fetchStockHistory = async () => {
    setError(null);
    const data = await getStockHistory(symbol.toUpperCase());
    if (data) {
      setStockData(data);
    } else {
      setError("Stock data not found. Please check the symbol.");
    }
  };

  useEffect(() => {
    fetchStockHistory();
    loadWatchlist();
  }, [symbol]);

 
  const addToWatchlist = () => {
    if (!watchlist.includes(symbol.toUpperCase())) {
      const updatedWatchlist = [...watchlist, symbol.toUpperCase()];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  const loadWatchlist = () => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Stock Market Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        />
        <button 
          onClick={fetchStockHistory} 
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
      <button 
        onClick={addToWatchlist} 
        className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md mb-4"
      >
        Add to Watchlist
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {stockData.length > 0 && <StockChart data={stockData} />}
      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">📌 Watchlist</h2>
        {watchlist.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-4">
            {watchlist.map((stock, index) => (
              <li 
                key={index} 
                onClick={() => setSymbol(stock)}
                className="cursor-pointer p-2 border-b last:border-none hover:bg-gray-200 transition"
              >
                {stock}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No stocks added to watchlist.</p>
        )}
      </div>
      <Chatbot/>
    </div>
  );
}
