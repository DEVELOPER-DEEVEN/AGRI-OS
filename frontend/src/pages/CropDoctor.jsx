import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Camera, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const CropDoctor = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);

            // Random Mock Results
            const diagnoses = [
                {
                    disease: "Early Blight",
                    confidence: "92%",
                    symptoms: "Dark brown spots with concentric rings on lower leaves.",
                    treatment: "Apply fungicides containing Mancozeb or Chlorothalonil. Ensure proper spacing between plants for air circulation."
                },
                {
                    disease: "Yellow Leaf Curl",
                    confidence: "88%",
                    symptoms: "Leaves curling upwards, yellowing of veins, and stunted plant growth.",
                    treatment: "Control whitefly population using sticky traps. Remove and destroy infected plants immediately."
                },
                {
                    disease: "Healthy Crop",
                    confidence: "98%",
                    symptoms: "No visible signs of disease or stress. Leaves are vibrant green.",
                    treatment: "Continue with current irrigation and fertilization schedule. Monitor regularly."
                },
                {
                    disease: "Aphid Infestation",
                    confidence: "95%",
                    symptoms: "Small green/black insects on underside of leaves. Sticky honeydew residue.",
                    treatment: "Spray Neem oil or insecticidal soap. Introduce natural predators like ladybugs."
                }
            ];

            const randomResult = diagnoses[Math.floor(Math.random() * diagnoses.length)];
            setResult(randomResult);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('Crop Doctor')} 🩺</h1>
                <p className="text-gray-400 mt-1">{t('Upload a photo of your crop to detect diseases.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                    {image ? (
                        <div className="relative w-full h-full flex flex-col items-center">
                            <img src={image} alt="Uploaded Crop" className="max-h-[300px] rounded-xl mb-6 object-contain" />
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setImage(null)}
                                    className="px-6 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
                                >
                                    {t('Retake')}
                                </button>
                                <button
                                    onClick={analyzeImage}
                                    disabled={analyzing}
                                    className="px-6 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2"
                                >
                                    {analyzing ? t('Analyzing...') : t('Analyze Disease')}
                                    {!analyzing && <ArrowRight size={18} />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Camera size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{t('Upload Photo')}</h3>
                            <p className="text-gray-400 text-center mb-6 max-w-xs">
                                {t('Take a clear photo of the affected leaf or plant area.')}
                            </p>
                            <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/20 flex items-center gap-2">
                                <Upload size={20} />
                                {t('Select Image')}
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </>
                    )}

                    {analyzing && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-white font-semibold animate-pulse">{t('Analyzing Crop Health...')}</p>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {result ? (
                        <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-500/30 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-red-500/20 p-3 rounded-full">
                                    <AlertTriangle className="text-red-400" size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{t('Disease Detected')}</h2>
                                    <p className="text-red-300">{result.disease} ({result.confidence})</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{t('Symptoms')}</h3>
                                    <p className="text-gray-300 leading-relaxed">{t(result.symptoms)}</p>
                                </div>

                                <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                                        <CheckCircle size={20} /> {t('Recommended Treatment')}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">{t(result.treatment)}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center opacity-50">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle size={32} className="text-gray-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{t('No Analysis Yet')}</h3>
                            <p className="text-gray-400 max-w-xs">
                                {t('Upload an image and click analyze to see the diagnosis and treatment options.')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropDoctor;
