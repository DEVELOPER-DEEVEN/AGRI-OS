import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, AlertTriangle, Calendar } from 'lucide-react';
import API_BASE_URL from '../config';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
                const data = await response.json();

                // Helper to map WMO codes to conditions
                const getCondition = (code) => {
                    if (code === 0) return 'Clear Sky';
                    if (code >= 1 && code <= 3) return 'Partly Cloudy';
                    if (code >= 45 && code <= 48) return 'Foggy';
                    if (code >= 51 && code <= 67) return 'Rainy';
                    if (code >= 71 && code <= 77) return 'Snowy';
                    if (code >= 80 && code <= 82) return 'Heavy Rain';
                    if (code >= 95) return 'Thunderstorm';
                    return 'Cloudy';
                };

                const current = data.current;
                const daily = data.daily;

                setWeatherData({
                    location: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`, // Ideally reverse geocode this
                    temp: Math.round(current.temperature_2m),
                    condition: getCondition(current.weather_code),
                    humidity: current.relative_humidity_2m,
                    windSpeed: current.wind_speed_10m,
                    forecast: daily.time.slice(1, 6).map((date, i) => ({
                        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                        temp: Math.round(daily.temperature_2m_max[i + 1]),
                        condition: getCondition(daily.weather_code[i + 1])
                    }))
                });
            } catch (error) {
                console.error('Error fetching weather:', error);
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Default to New Delhi
                    fetchWeather(28.61, 77.20);
                }
            );
        } else {
            // Default to New Delhi
            fetchWeather(28.61, 77.20);
        }
    }, []);

    const alerts = [
        { type: 'warning', message: 'Heavy rainfall expected on Wednesday. Secure harvested crops.' },
        { type: 'info', message: 'Ideal conditions for fertilizer application today.' },
    ];

    // Helper to get icon based on condition string (simplified)
    const getIcon = (cond) => {
        if (cond.toLowerCase().includes('rain')) return CloudRain;
        if (cond.toLowerCase().includes('cloud')) return CloudRain; // Using CloudRain as placeholder for clouds
        return Sun;
    };

    if (loading) {
        return <div className="text-white text-center py-20">Loading weather data...</div>;
    }

    if (!weatherData) {
        return <div className="text-white text-center py-20">Failed to load weather data.</div>;
    }

    const { temp, condition, humidity, windSpeed, location, forecast } = weatherData;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Weather Forecast</h1>

            {/* Current Weather Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold mb-2">{location}</h2>
                        <div className="text-6xl font-bold mb-2">{temp}°C</div>
                        <p className="text-xl opacity-90">{condition}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Droplets size={24} className="text-blue-200" />
                            <div>
                                <p className="text-sm opacity-70">Humidity</p>
                                <p className="font-semibold">{humidity}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Wind size={24} className="text-blue-200" />
                            <div>
                                <p className="text-sm opacity-70">Wind</p>
                                <p className="font-semibold">{windSpeed} km/h</p>
                            </div>
                        </div>
                    </div>
                    <Sun size={120} className="text-yellow-400 animate-pulse" />
                </div>
                {/* Decorative circles */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
            </div>

            {/* 5-Day Forecast */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar size={20} /> 5-Day Forecast
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {forecast.map((day, idx) => {
                        const Icon = getIcon(day.condition);
                        return (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
                                <p className="text-gray-400 text-sm mb-2">{day.day}</p>
                                <Icon size={32} className="mx-auto mb-2 text-yellow-400" />
                                <p className="text-xl font-bold text-white">{day.temp}°C</p>
                                <p className="text-xs text-gray-400">{day.condition}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Advisories</h3>
                {alerts.map((alert, idx) => (
                    <div
                        key={idx}
                        className={`p-4 rounded-xl border flex items-start gap-4 ${alert.type === 'warning'
                            ? 'bg-red-500/10 border-red-500/30 text-red-200'
                            : 'bg-blue-500/10 border-blue-500/30 text-blue-200'
                            }`}
                    >
                        <AlertTriangle size={24} className={alert.type === 'warning' ? 'text-red-400' : 'text-blue-400'} />
                        <p>{alert.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
