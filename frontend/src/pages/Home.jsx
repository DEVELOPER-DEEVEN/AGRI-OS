import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Leaf, CloudRain, TrendingUp, MapPin, Droplets } from 'lucide-react';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [loginForm, setLoginForm] = useState({ name: '', location: '', soil: '' });

    useEffect(() => {
        const savedUser = localStorage.getItem('agriUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            // Show login after a short delay for new users
            const timer = setTimeout(() => setShowLogin(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const userData = { ...loginForm, id: Date.now() };
        localStorage.setItem('agriUser', JSON.stringify(userData));
        setUser(userData);
        setShowLogin(false);
    };

    return (
        <div className="space-y-8 relative">
            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold text-white mb-2">{t('Welcome to Agri OS')} 🌾</h2>
                        <p className="text-gray-400 mb-6">{t('Tell us about your farm for personalized advice.')}</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Your Name')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                    value={loginForm.name}
                                    onChange={e => setLoginForm({ ...loginForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('District / Location')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                    value={loginForm.location}
                                    onChange={e => setLoginForm({ ...loginForm, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Soil Type')}</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                    value={loginForm.soil}
                                    onChange={e => setLoginForm({ ...loginForm, soil: e.target.value })}
                                >
                                    <option value="">Select Soil Type</option>
                                    <option value="Alluvial">Alluvial Soil</option>
                                    <option value="Black">Black Soil</option>
                                    <option value="Red">Red Soil</option>
                                    <option value="Clay">Clay Soil</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all mt-4">
                                {t('Get Started')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* News Ticker */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 overflow-hidden">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">ALERT</span>
                <div className="flex-1 overflow-hidden whitespace-nowrap">
                    <p className="text-red-300 text-sm animate-marquee inline-block">
                        Heavy rainfall alert for Guntur district in next 48 hours • PM-KISAN 16th installment released • New subsidy on solar pumps available
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-emerald-800 p-8 md:p-12 shadow-2xl">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {user ? `${t('Welcome back')}, ${user.name}!` : t('Welcome')}
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mb-8">
                        {t('Subtitle')}
                    </p>

                    {user && (
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2 text-white border border-white/10">
                                <MapPin size={16} className="text-green-300" />
                                <span>{user.location}</span>
                            </div>
                            <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-lg flex items-center gap-2 text-white border border-white/10">
                                <Droplets size={16} className="text-blue-300" />
                                <span>{user.soil || 'Soil Type'}</span>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/recommendations')}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/20 flex items-center gap-2"
                    >
                        {t('Get Started')} <ArrowRight size={20} />
                    </button>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                    <Leaf size={300} />
                </div>
            </div>

            {/* Quick Stats / Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Crop Health', value: 'Good', icon: Leaf, color: 'text-green-400' },
                    { title: 'Weather', value: '24°C, Sunny', icon: CloudRain, color: 'text-blue-400' },
                    { title: 'Market Trend', value: '+5% Profit', icon: TrendingUp, color: 'text-emerald-400' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
