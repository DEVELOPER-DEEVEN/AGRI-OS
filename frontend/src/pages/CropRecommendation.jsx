import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Droplets, ThermometerSun, MapPin, Loader2, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config';

const CropRecommendation = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setRecommendations(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t('Crop Recommendation')}</h1>
                    <p className="text-gray-400 mt-1">{t('Subtitle')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-fit">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Sprout className="text-green-400" /> {t('Farm Details')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">{t('District / Location')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                    placeholder="e.g. Guntur, AP"
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    required
                                />
                                <MapPin className="absolute right-3 top-3 text-gray-500" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">{t('Land Size (Acres)')}</label>
                            <input
                                type="number"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                                placeholder="e.g. 5"
                                value={formData.landSize}
                                onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Soil Type')}</label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                                    value={formData.soilType}
                                    onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                >
                                    <option value="Alluvial">Alluvial</option>
                                    <option value="Black">Black</option>
                                    <option value="Red">Red</option>
                                    <option value="Clay">Clay</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{t('Season')}</label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                                    value={formData.season}
                                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                >
                                    <option value="Kharif">Kharif</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Zaid">Zaid</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20 mt-4 flex justify-center items-center gap-2"
                        >
                            {loading ? t('Analyzing...') : t('Get Recommendations')}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {!showResults ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl p-12 bg-white/5">
                            <Sprout size={48} className="mb-4 opacity-50" />
                            <p>{t('Subtitle')}</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl font-semibold">{t('Recommended Crops for You')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {recommendations.map((crop, idx) => (
                                    <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-xl bg-${crop.color}-500/20 text-${crop.color}-400`}>
                                                <Sprout size={24} />
                                            </div>
                                            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                                                {crop.suitability} {t('Match')}
                                            </span>
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">{crop.name}</h4>
                                        <div className="space-y-2 text-sm text-gray-300 mb-6">
                                            <div className="flex justify-between">
                                                <span>{t('Expected Yield')}:</span>
                                                <span className="font-medium text-white">{crop.yield}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>{t('Market Price')}:</span>
                                                <span className="font-medium text-white">{crop.price}</span>
                                            </div>
                                        </div>
                                        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium">
                                            {t('View Detailed Guide')}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Insights */}
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
                                <CloudRain className="text-blue-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-semibold text-blue-400 mb-1">{t('Weather Advisory')}</h4>
                                    <p className="text-sm text-gray-300">
                                        Heavy rainfall expected in the next 10 days. Ensure proper drainage for {recommendations[0].name}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropRecommendation;
