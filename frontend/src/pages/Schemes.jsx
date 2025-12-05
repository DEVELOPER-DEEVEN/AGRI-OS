import React, { useState, useEffect } from 'react';
import { Award, BookOpen, ExternalLink, ChevronRight, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import API_BASE_URL from '../config';

const Schemes = () => {
    const { t } = useTranslation();
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/schemes`);
                const data = await response.json();
                setSchemes(data);
            } catch (error) {
                console.error('Error fetching schemes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Award className="text-yellow-400" /> {t('Government Schemes')}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <p className="text-gray-400">{t('Loading')}</p>
                ) : (
                    schemes.map((scheme) => (
                        <div key={scheme.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                                    {scheme.category}
                                </span>
                                <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{scheme.title}</h3>
                            <p className="text-gray-300 mb-6 text-sm">{scheme.description}</p>
                            <button className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
                                {t('Apply Now')}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                    <GraduationCap className="text-blue-400" /> {t('Training Modules')}
                </h2>
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{t('Modern Farming Techniques')}</h3>
                        <p className="text-gray-300 mb-4">
                            Learn about drip irrigation, organic fertilizers, and pest management through our interactive video modules.
                        </p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                            {t('Start Learning')}
                        </button>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl">
                        <BookOpen size={64} className="text-blue-300" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schemes;
