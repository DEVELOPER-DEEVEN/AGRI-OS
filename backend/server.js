const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Mock Data
const recommendations = [
    {
        name: 'Paddy (Rice)',
        suitability: '95%',
        yield: '45-50 quintals/ha',
        price: '₹2,200/quintal',
        profit: 'High',
        color: 'green',
    },
    {
        name: 'Cotton',
        suitability: '85%',
        yield: '25-30 quintals/ha',
        price: '₹6,000/quintal',
        profit: 'Medium',
        color: 'blue',
    },
];

const weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    location: 'Guntur, AP',
    forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 26, condition: 'Light Rain' },
        { day: 'Wed', temp: 25, condition: 'Heavy Rain' },
        { day: 'Thu', temp: 27, condition: 'Sunny' },
        { day: 'Fri', temp: 29, condition: 'Clear' },
    ]
};

const marketData = [
    { crop: 'Paddy (Common)', market: 'Guntur Mandi', price: 2200, minPrice: 2150, maxPrice: 2250, change: 5.2, trend: 'up', lastUpdated: '2 hrs ago', distance: '12 km', grade: 'Grade A' },
    { crop: 'Cotton', market: 'Warangal Mandi', price: 6100, minPrice: 6000, maxPrice: 6200, change: -1.5, trend: 'down', lastUpdated: '4 hrs ago', distance: '45 km', grade: 'Medium Staple' },
    { crop: 'Chilli', market: 'Guntur Mandi', price: 12500, minPrice: 12000, maxPrice: 13000, change: 2.8, trend: 'up', lastUpdated: '1 hr ago', distance: '12 km', grade: 'Teja' },
    { crop: 'Maize', market: 'Vijayawada Mandi', price: 1850, minPrice: 1800, maxPrice: 1900, change: 0.5, trend: 'up', lastUpdated: '5 hrs ago', distance: '30 km', grade: 'Hybrid' },
    { crop: 'Turmeric', market: 'Nizamabad Mandi', price: 6800, minPrice: 6600, maxPrice: 7000, change: -0.8, trend: 'down', lastUpdated: '1 day ago', distance: '120 km', grade: 'Finger' },
];

const schemesData = [
    {
        id: 1,
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.',
        category: 'Insurance',
        link: '#'
    },
    {
        id: 2,
        title: 'PM-KISAN',
        description: 'Income support of ₹6,000 per year to all landholding farmer families.',
        category: 'Financial Support',
        link: '#'
    },
    {
        id: 3,
        title: 'Soil Health Card Scheme',
        description: 'Helps farmers to know the soil health status and provides recommendations on nutrients.',
        category: 'Soil Health',
        link: '#'
    }
];

const transportData = [
    { name: 'Raju Transport', vehicle: 'Tata Ace', rating: 4.8, price: '₹15/km' },
    { name: 'Kisan Logistics', vehicle: 'Mahindra Bolero', rating: 4.5, price: '₹18/km' },
    { name: 'Village Movers', vehicle: 'Tractor', rating: 4.2, price: '₹12/km' },
];

// Routes
app.get('/', (req, res) => {
    res.send('Agri OS Backend is running');
});

app.post('/api/recommendations', (req, res) => {
    // In a real app, we would process req.body (soil, land, etc.)
    // For now, return mock data
    setTimeout(() => {
        res.json(recommendations);
    }, 1000);
});

app.get('/api/weather', (req, res) => {
    res.json(weatherData);
});

app.get('/api/market', (req, res) => {
    res.json(marketData);
});

app.get('/api/schemes', (req, res) => {
    res.json(schemesData);
});

app.get('/api/transport', (req, res) => {
    res.json(transportData);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
