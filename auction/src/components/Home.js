import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
    const auctionItems = [
        {
            id: 1,
            title: 'Sony Black Headphones',
            description: 'High-quality over-ear headphones with noise cancellation.',
            imageUrl: 'sony-headphones.jpg',
            startingBid: 100,
            currentHighestBid: 157,
            endDate: '2023-12-01T12:00',
        },
        {
            id: 2,
            title: 'Apple AirPod 2nd Gen',
            description: 'Second-generation Apple AirPods with wireless charging case.',
            imageUrl: 'apple-airpods.jpg',
            startingBid: 80,
            currentHighestBid: 95,
            endDate: '2023-12-15T12:00',
        },
        {
            id: 3,
            title: 'Mi20000mAh Power Bank',
            description: 'Portable high-capacity power bank with dual USB output.',
            imageUrl: 'powerbank.jpg',
            startingBid: 40,
            currentHighestBid: 46,
            endDate: '2023-11-25T12:00',
        },
        {
            id: 4,
            title: 'boat Bluetooth Speaker',
            description: 'Compact wireless Bluetooth speaker with rich sound quality.',
            imageUrl: 'speaker.jpg', 
            startingBid: 10,
            currentHighestBid: 15,
            endDate: '2023-11-29T12:00',
        },
    ];

    return (
        <div style={containerStyle}>
            <Navbar />
            <h1 style={headerStyle}>Welcome to the Auction House</h1>
            <div style={gridStyle}>
                {auctionItems.map(item => (
                    <div key={item.id} style={cardStyle}>
                        <img src={item.imageUrl} alt={item.title} style={imageStyle} />
                        <div style={cardContentStyle}>
                            <span style={auctionStatusStyle}>Live Auction</span>
                            <h3 style={itemTitleStyle}>{item.title}</h3>
                            <p>Minimum Bid: ${item.startingBid}</p>
                            <p>Current Bid: ${item.currentHighestBid}</p>
                            <p>Ends in: {new Date(item.endDate).toLocaleString()}</p>
                            <Link 
                                to={`/bidding`} 
                                state={{ auctionItem: item }} 
                                style={buttonStyle}
                            >
                                Bid now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    padding: '20px',
};

const headerStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
};

const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
};

const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
};

const cardContentStyle = {
    padding: '15px',
    textAlign: 'center',
};

const auctionStatusStyle = {
    display: 'inline-block',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '0.85rem',
    marginBottom: '10px',
};

const itemTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '10px 0',
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ff6347',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    marginTop: '15px',
};

export default Home;
