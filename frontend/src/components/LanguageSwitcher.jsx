import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Globe size={20} />
                <span className="text-sm font-medium uppercase">{i18n.language.split('-')[0]}</span>
            </button>
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 border border-white/10 rounded-xl overflow-hidden hidden group-hover:block shadow-xl z-50">
                <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">English</button>
                <button onClick={() => changeLanguage('hi')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">हिंदी (Hindi)</button>
                <button onClick={() => changeLanguage('te')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">తెలుగు (Telugu)</button>
                <button onClick={() => changeLanguage('mr')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">मराठी (Marathi)</button>
                <button onClick={() => changeLanguage('ta')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">தமிழ் (Tamil)</button>
                <button onClick={() => changeLanguage('bn')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">বাংলা (Bengali)</button>
                <button onClick={() => changeLanguage('kn')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">ಕನ್ನಡ (Kannada)</button>
                <button onClick={() => changeLanguage('gu')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">ગુજરાતી (Gujarati)</button>
                <button onClick={() => changeLanguage('ml')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">മലയാളം (Malayalam)</button>
                <button onClick={() => changeLanguage('pa')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">ਪੰਜਾਬੀ (Punjabi)</button>
                <button onClick={() => changeLanguage('or')} className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm text-gray-300 hover:text-white">ଓଡ଼ିଆ (Odia)</button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
