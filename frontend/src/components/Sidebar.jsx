import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Sprout, CloudSun, Store, Users, Settings, Award, Truck, Stethoscope } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Sidebar = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const navItems = [
        { name: t('Dashboard'), icon: Home, path: '/' },
        { name: t('Crop Recommendation'), icon: Sprout, path: '/recommendations' },
        { name: t('Weather'), icon: CloudSun, path: '/weather' },
        { name: t('Mandi Prices'), icon: Store, path: '/market' },
        { name: t('Community'), icon: Users, path: '/community' },
        { name: t('Schemes'), icon: Award, path: '/schemes' },
        { name: t('Transport'), icon: Truck, path: '/transport' },
        { name: t('Expert Consultation'), icon: Stethoscope, path: '/consultation' },
        { name: t('Crop Doctor'), icon: Sprout, path: '/crop-doctor' },
    ];

    return (
        <aside className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen fixed left-0 top-0 text-white z-50 hidden md:block">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Agri OS
                </h1>
            </div>
            <nav className="mt-6 px-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 ${isActive
                                ? 'bg-green-600/20 text-green-400 shadow-lg shadow-green-900/10 border border-green-500/30'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="absolute bottom-0 w-full p-4 space-y-2">
                <LanguageSwitcher />
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white transition-colors">
                    <Settings size={20} />
                    <span>{t('Settings')}</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
