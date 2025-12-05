import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ThumbsUp, Share2, Send, Bot, User, Mic, MicOff } from 'lucide-react';
import useVoiceAssistant from '../hooks/useVoiceAssistant';

const Community = () => {
    const { t } = useTranslation();
    const { isListening, transcript, startListening, stopListening } = useVoiceAssistant();

    useEffect(() => {
        if (transcript) {
            setChatInput(transcript);
        }
    }, [transcript]);

    const [activeTab, setActiveTab] = useState('feed');
    const [chatInput, setChatInput] = useState('');
    const [postInput, setPostInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Namaste! I am your Agri Assistant. Ask me about weather, crop prices, or government schemes.' }
    ]);

    const [feedPosts, setFeedPosts] = useState([
        {
            author: 'Ramesh Kumar',
            role: 'Farmer',
            content: 'Has anyone used the new organic fertilizer for cotton? Seeing good results in my field.',
            likes: 24,
            comments: 5,
            time: '2 hours ago',
        },
        {
            author: 'Dr. Anita Singh',
            role: 'Agri Expert',
            content: 'Advisory: Heavy rains expected in Guntur region. Please ensure drainage channels are clear.',
            likes: 156,
            comments: 12,
            time: '5 hours ago',
            isExpert: true,
        },
    ]);

    const handleCreatePost = () => {
        if (!postInput.trim()) return;
        const newPost = {
            author: 'You',
            role: 'Farmer',
            content: postInput,
            likes: 0,
            comments: 0,
            time: 'Just now',
        };
        setFeedPosts([newPost, ...feedPosts]);
        setPostInput('');
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newMessages = [...messages, { type: 'user', text: chatInput }];
        setMessages(newMessages);
        setChatInput('');

        // Smart Bot Logic
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Please ask about weather, prices, or schemes.";
            const lowerInput = chatInput.toLowerCase();

            if (lowerInput.includes('weather') || lowerInput.includes('rain')) {
                botResponse = "Current weather in Guntur is 28°C with partly cloudy skies. Heavy rain is expected on Wednesday.";
            } else if (lowerInput.includes('price') || lowerInput.includes('rate') || lowerInput.includes('mandi')) {
                botResponse = "Today's prices: Paddy ₹2,200/q, Cotton ₹6,100/q, Chilli ₹12,500/q.";
            } else if (lowerInput.includes('scheme') || lowerInput.includes('subsidy')) {
                botResponse = "Popular schemes: PM-KISAN (₹6000/yr), PMFBY (Crop Insurance), and Soil Health Card.";
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botResponse = "Namaste! How can I help you with your farming today?";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === 'feed'
                        ? 'bg-green-500 text-white shadow-lg shadow-green-900/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    {t('Community Feed')}
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-6 py-2 rounded-xl font-medium transition-all ${activeTab === 'chat'
                        ? 'bg-green-500 text-white shadow-lg shadow-green-900/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    {t('AI Assistant')}
                </button>
            </div>

            {activeTab === 'feed' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Create Post */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">
                                    You
                                </div>
                                <input
                                    type="text"
                                    value={postInput}
                                    onChange={(e) => setPostInput(e.target.value)}
                                    placeholder="Share your experience or ask a question..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <button
                                    onClick={handleCreatePost}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Post
                                </button>
                            </div>
                        </div>

                        {/* Feed */}
                        {feedPosts.map((post, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${post.isExpert ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {post.author[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white flex items-center gap-2">
                                            {post.author}
                                            {post.isExpert && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">Expert</span>}
                                        </h4>
                                        <p className="text-xs text-gray-500">{post.role} • {post.time}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4">{post.content}</p>
                                <div className="flex gap-6 text-gray-400 text-sm">
                                    <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                                        <ThumbsUp size={18} /> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                                        <MessageSquare size={18} /> {post.comments}
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Share2 size={18} /> Share
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-6">
                            <h3 className="font-semibold text-purple-300 mb-2">Trending Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {['#OrganicFarming', '#Monsoon2025', '#CottonPrices', '#GovtSchemes'].map((tag) => (
                                    <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 cursor-pointer hover:bg-purple-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[600px] flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {/* Chat Area */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.type === 'user'
                                    ? 'bg-green-600 text-white rounded-tr-none'
                                    : 'bg-white/10 text-gray-200 rounded-tl-none'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                                        {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                                        <span>{msg.type === 'user' ? 'You' : 'Agri Assistant'}</span>
                                    </div>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-black/20 border-t border-white/10 flex gap-4">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about crops, weather, or prices..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                        />
                        <button
                            type="button"
                            onClick={startListening}
                            className={`p-3 rounded-xl transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-green-900/20"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Community;
