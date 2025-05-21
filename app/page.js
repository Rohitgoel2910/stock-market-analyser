import Link from "next/link";
import Script from "next/script";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 text-center p-6">
    
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Stock Market Analysis</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Track live stock prices, create custom watchlists, and stay updated with real-time market trends.
      </p>
      <div className="w-full max-w-md mb-6">
        <div className="tenor-gif-embed" data-postid="453234895756965217" data-share-method="host" data-aspect-ratio="1" data-width="100%">
          <a href="https://tenor.com/view/btc-bitcoin-bull-market-bullish-ath-gif-453234895756965217">Btc Bitcoin GIF</a> from <a href="https://tenor.com/search/btc-gifs">Btc GIFs</a>
        </div>
      </div>
      <Link href="/home" passHref>
          <button className="bg-blue-600 hover:bg-blue-800 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Get Started
          </button>
       
      </Link>
      <Script src="https://tenor.com/embed.js" strategy="afterInteractive" />
    </div>
  );
}
