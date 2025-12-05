import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useVoiceAssistant = () => {
    const { i18n } = useTranslation();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Map app language codes to Web Speech API language codes
    const langMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'te': 'te-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'bn': 'bn-IN',
        'kn': 'kn-IN',
        'gu': 'gu-IN',
        'ml': 'ml-IN',
        'pa': 'pa-IN',
        'or': 'or-IN'
    };

    const currentLang = langMap[i18n.language] || 'en-US';

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.lang = currentLang;
        recognition.interimResults = false;
    }

    const startListening = useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.lang = currentLang; // Update lang before starting
                recognition.start();
                setIsListening(true);
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        }
    }, [recognition, isListening, currentLang]);

    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition, isListening]);

    const speak = useCallback((text) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLang;

            // Try to find a matching voice
            const voices = window.speechSynthesis.getVoices();
            const matchingVoice = voices.find(voice => voice.lang.startsWith(currentLang.split('-')[0]));
            if (matchingVoice) {
                utterance.voice = matchingVoice;
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Text-to-speech not supported");
        }
    }, [currentLang]);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            const current = event.resultIndex;
            const transcriptText = event.results[current][0].transcript;
            setTranscript(transcriptText);
            stopListening();
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

    }, [recognition, stopListening]);

    return { isListening, transcript, startListening, stopListening, speak, isSpeaking };
};

export default useVoiceAssistant;
