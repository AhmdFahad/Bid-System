// File: src/App.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001"); // Make sure to match backend port

function App() {
  const [currentBid, setCurrentBid] = useState(0);

  useEffect(() => {
    socket.on("bid_update", (amount) => {
      setCurrentBid(amount);
    });
    return () => socket.off("bid_update");
  }, []);

  const sendBid = (amount) => {
    socket.emit("place_bid", amount);
  };

  return (
    <div className="container">
      <h1 className="title">Current Bid</h1>
      <div className="bid-display">{currentBid} SAR</div>
      <div className="button-group">
        {[5, 10, 15].map((amount) => (
          <button
            key={amount}
            onClick={() => sendBid(amount)}
            className="bid-button"
          >
            +{amount} SAR
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;