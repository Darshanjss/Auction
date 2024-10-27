import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const API_URL = 'https://localhost:5001/api/auction';

const Bidding = () => {
    const location = useLocation();
    const auctionItem = location.state?.auctionItem;

    const [bidAmount, setBidAmount] = useState('');
    const [highestBid, setHighestBid] = useState(auctionItem?.startingBid || 0);
    const [bidHistory, setBidHistory] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (auctionItem) {
            fetch(`${API_URL}/${auctionItem.id}/bids`)
                .then(response => response.json())
                .then(data => {
                    setHighestBid(data.CurrentHighestBid);
                    setBidHistory(data.BidHistory);
                })
                .catch(error => console.error('Error fetching bid history:', error));
        }
    }, [auctionItem]);
    
    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    };

    const placeBid = async (e) => {
        e.preventDefault();
        const bidValue = parseFloat(bidAmount);
    
        if (bidValue <= highestBid) {
            setNotifications([...notifications, `Your bid of $${bidValue} is lower than the highest bid of $${highestBid}.`]);
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/${auctionItem.id}/bid`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: bidValue, timestamp: new Date() }),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                setHighestBid(updatedItem.currentHighestBid);
                setBidHistory(updatedItem.bidHistory);
                setBidAmount('');
                setNotifications([]);
            } else {
                const errorMsg = await response.text();
                setNotifications([...notifications, errorMsg]);
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };
    

    return (
        <div style={containerStyle}>
             <Navbar />
            <h1 style={headerStyle}>Bidding on {auctionItem?.title}</h1>
            <h3>Current Highest Bid: ${highestBid}</h3>
            <form onSubmit={placeBid} style={formStyle}>
                <input
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmount}
                    onChange={handleBidChange}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Place Bid</button>
            </form>

            {notifications.length > 0 && (
                <div style={notificationStyle}>
                    {notifications.map((note, index) => (
                        <p key={index} style={{ color: 'red' }}>{note}</p>
                    ))}
                </div>
            )}

            <h2 style={headerStyle}>Bid History</h2>
            <ul style={listStyle}>
                {bidHistory.map((bid, index) => (
                    <li key={index} style={itemStyle}>
                        <p>Bid: ${bid.amount} - {bid.timestamp.toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Styles
const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const headerStyle = {
    color: '#333',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
};

const inputStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
};

const listStyle = {
    listStyleType: 'none',
    padding: 0,
};

const itemStyle = {
    backgroundColor: '#fff',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const notificationStyle = {
    margin: '10px 0',
};

export default Bidding;
