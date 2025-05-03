// File: src/MonitorApp.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./MonitorApp.css";

const socket = io("http://localhost:3001");

function MonitorApp() {
  const [currentBid, setCurrentBid] = useState(0);

  useEffect(() => {
    socket.on("bid_update", (amount) => {
      setCurrentBid(amount);
    });
    return () => socket.off("bid_update");
  }, []);

  return (
    <div className="monitor-container">
      <h1 className="monitor-title">Live Bidding Display</h1>
      <div className="monitor-bid">{currentBid} SAR</div>
    </div>
  );
}

export default MonitorApp;
