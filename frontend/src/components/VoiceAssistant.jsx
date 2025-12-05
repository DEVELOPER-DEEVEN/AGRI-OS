import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import useVoiceAssistant from '../hooks/useVoiceAssistant';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
    const { isListening, transcript, startListening, stopListening, speak, isSpeaking } = useVoiceAssistant();
    const navigate = useNavigate();

    useEffect(() => {
        if (transcript) {
            handleCommand(transcript.toLowerCase());
        }
    }, [transcript]);

    const handleCommand = (command) => {
        console.log("Voice Command:", command);

        if (command.includes('home') || command.includes('dashboard')) {
            speak("Navigating to Dashboard");
            navigate('/');
        } else if (command.includes('market') || command.includes('price')) {
            speak("Opening Market Prices");
            navigate('/market');
        } else if (command.includes('weather')) {
            speak("Showing Weather Forecast");
            navigate('/weather');
        } else if (command.includes('community') || command.includes('chat')) {
            speak("Opening Community Hub");
            navigate('/community');
        } else if (command.includes('scheme')) {
            speak("Showing Government Schemes");
            navigate('/schemes');
        } else if (command.includes('transport')) {
            speak("Opening Transport Services");
            navigate('/transport');
        } else if (command.includes('setting')) {
            speak("Opening Settings");
            navigate('/settings');
        } else {
            speak("Sorry, I didn't understand that command.");
        }
    };

    return (
        <div className="fixed bottom-24 right-6 z-50">
            {isSpeaking && (
                <div className="absolute -top-12 right-0 bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap animate-pulse">
                    Speaking...
                </div>
            )}

            <button
                onClick={isListening ? stopListening : startListening}
                className={`p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 ${isListening
                        ? 'bg-red-500 animate-pulse ring-4 ring-red-500/30'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}
            >
                {isListening ? <MicOff className="text-white" size={28} /> : <Mic className="text-white" size={28} />}
            </button>
        </div>
    );
};

export default VoiceAssistant;
