import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Star, Phone, Video, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const Consultation = () => {
    const { t } = useTranslation();
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null); // null, 'booking', 'confirmed'

    const experts = [
        {
            id: 1,
            name: "Dr. Ramesh Gupta",
            specialization: "Soil Health & Fertilizers",
            experience: "15 Years",
            rating: 4.8,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
        },
        {
            id: 2,
            name: "Ms. Anita Desai",
            specialization: "Pest Management",
            experience: "8 Years",
            rating: 4.9,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
        },
        {
            id: 3,
            name: "Mr. Suresh Kumar",
            specialization: "Organic Farming",
            experience: "12 Years",
            rating: 4.7,
            reviews: 210,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        }
    ];

    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');

    const handleBook = (expert) => {
        setSelectedExpert(expert);
        setBookingStatus('booking');
    };

    const handleChat = (expert) => {
        setSelectedExpert(expert);
        setChatOpen(true);
        setChatMessages([
            { sender: 'expert', text: `Hello! I am ${expert.name}. How can I help you today?` }
        ]);
    };

    const sendChatMessage = () => {
        if (!chatInput.trim()) return;

        const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
        setChatMessages(newMessages);
        setChatInput('');

        // Dynamic Mock Responses
        const userText = chatInput.toLowerCase();
        let replyText = "That's an interesting observation. Could you provide more details?";

        if (userText.includes('hello') || userText.includes('hi')) {
            replyText = "Namaste! How can I assist you with your farm today?";
        } else if (userText.includes('weather') || userText.includes('rain')) {
            replyText = "It looks like rain is expected. I suggest holding off on irrigation for now.";
        } else if (userText.includes('fertilizer') || userText.includes('soil')) {
            replyText = "For this soil type, NPK 20-20-20 is usually effective. Have you done a soil test recently?";
        } else if (userText.includes('pest') || userText.includes('bug') || userText.includes('insect')) {
            replyText = "Please upload a photo in the Crop Doctor section so I can identify the pest correctly.";
        } else if (userText.includes('price') || userText.includes('rate') || userText.includes('market')) {
            replyText = "Market prices are fluctuating. Check the 'Mandi Prices' tab for the latest real-time rates.";
        }

        // Mock expert reply with delay
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                sender: 'expert',
                text: replyText
            }]);
        }, 1500);
    };

    const confirmBooking = () => {
        setBookingStatus('confirmed');
        setTimeout(() => {
            setSelectedExpert(null);
            setBookingStatus(null);
        }, 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">{t('Expert Consultation')}</h1>
                    <p className="text-gray-400 mt-1">{t('Connect with top agronomists for personalized advice.')}</p>
                </div>
            </div>

            {/* Upcoming Appointments (Mock) */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-6 flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                    <Calendar className="text-blue-400" size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{t('Upcoming Call')}</h3>
                    <p className="text-gray-300 text-sm">
                        {t('Dr. Ramesh Gupta')} • {t('Tomorrow')}, 10:00 AM
                    </p>
                </div>
                <button className="ml-auto bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    {t('Join Call')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experts.map((expert) => (
                    <div key={expert.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group">
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src={expert.image}
                                alt={expert.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-green-500/50"
                            />
                            <div>
                                <h3 className="text-xl font-bold text-white">{expert.name}</h3>
                                <p className="text-green-400 text-sm">{t(expert.specialization)}</p>
                                <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                                    <Star size={14} fill="currentColor" />
                                    <span>{expert.rating}</span>
                                    <span className="text-gray-500">({expert.reviews} {t('Reviews')})</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-300 mb-6">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>{t('Experience')}</span>
                                <span className="text-white">{expert.experience}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span>{t('Language')}</span>
                                <span className="text-white">English, Hindi</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleBook(expert)}
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-medium transition-colors"
                            >
                                <Video size={18} />
                                {t('Video Call')}
                            </button>
                            <button
                                onClick={() => handleChat(expert)}
                                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-medium transition-colors border border-white/10"
                            >
                                <Phone size={18} />
                                {t('Chat')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Modal */}
            {chatOpen && selectedExpert && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-md h-[600px] flex flex-col">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-3xl">
                            <div className="flex items-center gap-3">
                                <img src={selectedExpert.image} alt="" className="w-10 h-10 rounded-full" />
                                <div>
                                    <h3 className="font-bold text-white">{selectedExpert.name}</h3>
                                    <p className="text-xs text-green-400">Online</p>
                                </div>
                            </div>
                            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-green-600 text-white rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-3xl">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-green-500"
                                />
                                <button
                                    onClick={sendChatMessage}
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-colors"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {selectedExpert && !chatOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-md w-full relative">
                        {bookingStatus === 'confirmed' ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{t('Booking Confirmed!')}</h2>
                                <p className="text-gray-400">{t('Your appointment with')} {selectedExpert.name} {t('is scheduled.')}</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">{t('Book Appointment')}</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-xl flex items-center gap-4">
                                        <img src={selectedExpert.image} alt="" className="w-12 h-12 rounded-full" />
                                        <div>
                                            <h3 className="font-bold text-white">{selectedExpert.name}</h3>
                                            <p className="text-sm text-gray-400">{t(selectedExpert.specialization)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">{t('Select Date')}</label>
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {['Today', 'Tomorrow', 'Wed', 'Thu'].map((day, i) => (
                                                <button key={i} className={`px-4 py-2 rounded-lg border ${i === 1 ? 'bg-green-500 border-green-500 text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                    {t(day)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">{t('Select Time')}</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['10:00 AM', '02:00 PM', '04:30 PM'].map((time, i) => (
                                                <button key={i} className={`px-2 py-2 rounded-lg border text-sm ${i === 0 ? 'bg-green-500 border-green-500 text-white' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedExpert(null)}
                                        className="flex-1 py-3 rounded-xl font-semibold text-gray-400 hover:bg-white/5 transition-colors"
                                    >
                                        {t('Cancel')}
                                    </button>
                                    <button
                                        onClick={confirmBooking}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-green-900/20"
                                    >
                                        {t('Confirm Booking')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Consultation;
