import React, { useState } from 'react';
import { User, Bell, Globe, Shield, LogOut, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({
        name: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        location: 'Guntur, Andhra Pradesh',
        language: 'English'
    });

    const [notifications, setNotifications] = useState({
        weather: true,
        market: true,
        schemes: false
    });

    const handleSave = () => {
        // Simulate save
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <User className="text-blue-400" /> Settings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Section */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <User size={20} className="text-green-400" /> Profile Information
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Location</label>
                            <input
                                type="text"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="space-y-8">
                    {/* Notifications */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Bell size={20} className="text-yellow-400" /> Notifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Weather Alerts</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.weather}
                                    onChange={(e) => setNotifications({ ...notifications, weather: e.target.checked })}
                                    className="w-5 h-5 accent-green-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Market Price Updates</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.market}
                                    onChange={(e) => setNotifications({ ...notifications, market: e.target.checked })}
                                    className="w-5 h-5 accent-green-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">New Schemes</span>
                                <input
                                    type="checkbox"
                                    checked={notifications.schemes}
                                    onChange={(e) => setNotifications({ ...notifications, schemes: e.target.checked })}
                                    className="w-5 h-5 accent-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* App Settings */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Shield size={20} className="text-purple-400" /> App Settings
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                <span className="text-gray-300">Privacy Policy</span>
                                <Shield size={16} className="text-gray-500" />
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-xl cursor-pointer hover:bg-red-500/20 transition-colors">
                                <span className="text-red-400">Log Out</span>
                                <LogOut size={16} className="text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/20 flex items-center gap-2"
                >
                    <Save size={20} /> Save Changes
                </button>
            </div>
        </div>
    );
};

export default Settings;
