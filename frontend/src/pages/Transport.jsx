import React, { useState } from 'react';
import { Truck, MapPin, Calculator, Package } from 'lucide-react';
import API_BASE_URL from '../config';

const Transport = () => {
    const [formData, setFormData] = useState({
        pickup: '',
        drop: '',
        weight: '',
        vehicle: 'Mini Truck'
    });
    const [cost, setCost] = useState(null);
    const [transporters, setTransporters] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchTransporters = async () => {
            try {
                const response = await fetch(`${API_BASE_URL} /api/transport`);
                const data = await response.json();
                setTransporters(data);
            } catch (error) {
                console.error('Error fetching transporters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransporters();
    }, []);

    const calculateCost = (e) => {
        e.preventDefault();
        // Mock calculation logic
        const baseRate = formData.vehicle === 'Mini Truck' ? 500 : 1200;
        const distance = 50; // Mock distance
        const weightCost = parseFloat(formData.weight) * 2;
        const total = baseRate + (distance * 10) + weightCost;
        setCost(total);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Truck className="text-orange-400" /> Transport & Logistics
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost Calculator */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Calculator className="text-green-400" /> Cost Calculator
                    </h2>
                    <form onSubmit={calculateCost} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Pickup Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                        placeholder="Village/Mandi"
                                        value={formData.pickup}
                                        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                                        required
                                    />
                                    <MapPin className="absolute right-3 top-3 text-gray-500" size={18} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Drop Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                        placeholder="Market/Warehouse"
                                        value={formData.drop}
                                        onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                                        required
                                    />
                                    <MapPin className="absolute right-3 top-3 text-gray-500" size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Load Weight (Quintals)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
                                    placeholder="e.g. 10"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Vehicle Type</label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 appearance-none"
                                    value={formData.vehicle}
                                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                                >
                                    <option>Mini Truck</option>
                                    <option>Pickup Van</option>
                                    <option>Tractor Trailer</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-orange-900/20 mt-4">
                            Calculate Cost
                        </button>
                    </form>

                    {cost && (
                        <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center animate-fade-in">
                            <p className="text-gray-300 text-sm">Estimated Cost</p>
                            <p className="text-3xl font-bold text-green-400">₹{cost}</p>
                            <button className="mt-3 text-sm text-green-400 underline hover:text-green-300">Book Now</button>
                        </div>
                    )}
                </div>

                {/* Available Vehicles */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Available Transporters Nearby</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading transporters...</p>
                    ) : (
                        transporters.map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
                                        <Truck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{item.name}</h3>
                                        <p className="text-sm text-gray-400">{item.vehicle} • ⭐ {item.rating}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">{item.price}</p>
                                    <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full mt-1 transition-colors">Call</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transport;
