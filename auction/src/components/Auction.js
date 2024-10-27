import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const API_URL = 'https://localhost:5001/api/auction';

const Auction = () => {
    const [items, setItems] = useState([]);
    const [showDefaults, setShowDefaults] = useState(false);
    const [form, setForm] = useState({
        id: null,
        title: '',
        description: '',
        startingBid: '',
        endDate: '',
        imageUrl: '',
    });
    
    const navigate = useNavigate();
    const defaultItems = [
        {
            id: 1,
            title: 'Antique Vase',
            description: 'A beautiful antique vase from the 18th century.',
            startingBid: 100,
            endDate: '2023-12-01T12:00',
            imageUrl: 'vase.jpg',
        },
        {
            id: 2,
            title: 'Vintage Watch',
            description: 'A vintage watch in excellent condition.',
            startingBid: 250,
            endDate: '2023-12-15T12:00',
            imageUrl: '', 
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = form.id ? 'PUT' : 'POST';
        const endpoint = form.id ? `${API_URL}/${form.id}` : `${API_URL}`;
    
        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                if (form.id) {
                    setItems(items.map(item => item.id === form.id ? updatedItem : item));
                } else {
                    setItems([...items, updatedItem]);
                }
                setForm({ id: null, title: '', description: '', startingBid: '', endDate: '', imageUrl: '' });
            } else {
                console.error('Failed to save item:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    useEffect(() => {
        fetch(`${API_URL}/items`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);


    const handleEdit = (item) => {
        setForm(item);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setItems(items.filter(item => item.id !== id));
            } else {
                console.error('Failed to delete item:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const toggleDefaultItems = () => {
        setShowDefaults(!showDefaults);
    };

    const handleBidClick = (item) => {
        navigate('/bidding', { state: { auctionItem: item } });
    };

    return (
        <div style={containerStyle}>
             <Navbar />
            <h1 style={headerStyle}>Create Auction Item</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    style={textareaStyle}
                />
                <input
                    type="number"
                    name="startingBid"
                    placeholder="Starting Bid"
                    value={form.startingBid}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <input
                    type="datetime-local"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
                <input
                    type="url"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>
                    {form.id ? 'Update Item' : 'Create Item'}
                </button>
            </form>

            <button onClick={toggleDefaultItems} style={buttonStyle}>
                {showDefaults ? 'Hide Default Items' : 'Show Default Items'}
            </button>

            {showDefaults && (
                <div>
                    <h2 style={headerStyle}>Default Auction Items</h2>
                    <div style={cardContainerStyle}>
                        {defaultItems.map(item => (
                            <div key={item.id} style={cardStyle}>
                                <img src={item.imageUrl} alt={item.title} style={imageStyle} />
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Minimum Bid: ${item.startingBid}</p>
                                <p>End Date: {new Date(item.endDate).toLocaleString()}</p>
                                <button onClick={() => handleBidClick(item)} style={bidButtonStyle}>Bid now</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 style={headerStyle}>Available Auction Items</h2>
            <div style={cardContainerStyle}>
                {items.map(item => (
                    <div key={item.id} style={cardStyle}>
                        <img src={item.imageUrl} alt={item.title} style={imageStyle} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>Minimum Bid: ${item.startingBid}</p>
                        <p>End Date: {new Date(item.endDate).toLocaleString()}</p>
                        <button onClick={() => handleBidClick(item)} style={bidButtonStyle}>Bid now</button>
                        <button onClick={() => handleEdit(item)} style={editButtonStyle}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={deleteButtonStyle}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const headerStyle = {
    color: '#333',
    marginBottom: '20px',
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

const textareaStyle = {
    margin: '10px 0',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
};

const buttonStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '20px',
};

const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
};

const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    padding: '15px',
    textAlign: 'center',
    position: 'relative',
};

const imageStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
};

const bidButtonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '10px',
    display: 'inline-block',
};

const editButtonStyle = {
    marginRight: '10px',
    backgroundColor: '#ffc107',
    color: 'white',
    borderRadius: '4px',
    padding: '5px 10px',
    marginTop: '10px',
};

const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '4px',
    padding: '5px 10px',
    marginTop: '10px',
};

export default Auction;
