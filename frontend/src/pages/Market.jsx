import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Search, Filter, Mic, MicOff } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_BASE_URL from '../config';
import useVoiceAssistant from '../hooks/useVoiceAssistant';

const Market = () => {
    const { t } = useTranslation();
    const { isListening, transcript, startListening, stopListening } = useVoiceAssistant();
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        if (transcript) {
            setSearchTerm(transcript);
        }
    }, [transcript]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPrices, setFilteredPrices] = useState([]);

    // Mock history data for the chart
    const historyData = [
        { name: 'Mon', price: 2100 },
        { name: 'Tue', price: 2150 },
        { name: 'Wed', price: 2120 },
        { name: 'Thu', price: 2180 },
        { name: 'Fri', price: 2200 },
        { name: 'Sat', price: 2250 },
        { name: 'Sun', price: 2220 },
    ];

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/market`);
                const data = await response.json();
                setPrices(data);
                setFilteredPrices(data);
            } catch (error) {
                console.error('Error fetching market prices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    useEffect(() => {
        const results = prices.filter(item =>
            item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.market.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPrices(results);
    }, [searchTerm, prices]);

    const [activeTab, setActiveTab] = useState('buy');
    const [myListings, setMyListings] = useState([]);
    const [sellForm, setSellForm] = useState({
        crop: '',
        quantity: '',
        price: ''
    });

    const handleListCrop = (e) => {
        e.preventDefault();
        const newListing = {
            id: Date.now(),
            ...sellForm,
            status: 'active'
        };
        setMyListings([newListing, ...myListings]);
        setSellForm({ crop: '', quantity: '', price: '' });
    };

    if (loading) {
        return <div className="text-white text-center py-20">{t('Loading')}</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{t('Mandi Prices')}</h1>

                {/* Tab Switcher */}
                <div className="flex bg-white/10 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('buy')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'buy' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t('Buy')}
                    </button>
                    <button
                        onClick={() => setActiveTab('sell')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'sell' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        {t('Sell')}
                    </button>
                </div>
            </div>

            {activeTab === 'buy' ? (
                <>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder={t('Search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                            <button
                                onClick={isListening ? stopListening : startListening}
                                className={`absolute right-2 top-1.5 p-1.5 rounded-lg transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white'}`}
                            >
                                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                            </button>
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-white transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>

                    {/* Price History Chart */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-6">Paddy Price Trend (Last 7 Days)</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={historyData}>
                                    <defs>
                                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#48BB78" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#48BB78" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                    <XAxis dataKey="name" stroke="#A0AEC0" />
                                    <YAxis stroke="#A0AEC0" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="price" stroke="#48BB78" fillOpacity={1} fill="url(#colorPrice)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrices.map((item, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{item.crop}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span>{item.market}</span>
                                            <span>•</span>
                                            <span>{item.distance}</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${item.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {item.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                        {Math.abs(item.change)}%
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div className="bg-black/20 p-2 rounded-lg">
                                        <p className="text-gray-500 text-xs">Grade</p>
                                        <p className="text-white font-medium">{item.grade}</p>
                                    </div>
                                    <div className="bg-black/20 p-2 rounded-lg">
                                        <p className="text-gray-500 text-xs">Range</p>
                                        <p className="text-white font-medium">₹{item.minPrice} - ₹{item.maxPrice}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('Market Price')}</p>
                                        <p className="text-2xl font-bold text-white">₹{item.price}<span className="text-sm font-normal text-gray-400">/quintal</span></p>
                                        <p className="text-xs text-gray-500 mt-1">Updated {item.lastUpdated}</p>
                                    </div>
                                    <button className="text-sm text-green-400 hover:text-green-300 underline">View History</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Market Insights */}
                    <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-500/20 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-emerald-400 mb-2">Market Insight</h3>
                        <p className="text-gray-300">
                            Cotton prices are expected to rise by 8-10% in the next week due to high demand from textile mills. Consider holding stock if possible.
                        </p>
                    </div>
                </>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sell Form */}
                    <div className="lg:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-6 text-white">{t('Sell Your Crop')}</h2>
                        <form onSubmit={handleListCrop} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Crop Name')}</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    value={sellForm.crop}
                                    onChange={(e) => setSellForm({ ...sellForm, crop: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Quantity (Quintals)')}</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    value={sellForm.quantity}
                                    onChange={(e) => setSellForm({ ...sellForm, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Expected Price (per Quintal)')}</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    value={sellForm.price}
                                    onChange={(e) => setSellForm({ ...sellForm, price: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20 mt-4"
                            >
                                {t('List Crop')}
                            </button>
                        </form>
                    </div>

                    {/* My Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xl font-semibold text-white">{t('My Listings')}</h3>
                        {myListings.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
                                <p className="text-gray-400">No active listings. Start selling today!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myListings.map((listing) => (
                                    <div key={listing.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded">
                                            ACTIVE
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">{listing.crop}</h4>
                                        <div className="space-y-2 text-sm text-gray-300 mb-4">
                                            <div className="flex justify-between">
                                                <span>Quantity:</span>
                                                <span className="text-white">{listing.quantity} Q</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Price:</span>
                                                <span className="text-white">₹{listing.price}/Q</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors text-sm">
                                                Edit
                                            </button>
                                            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors text-sm">
                                                Mark Sold
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Market;
