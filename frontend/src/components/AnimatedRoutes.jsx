import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import CropRecommendation from '../pages/CropRecommendation';
import Weather from '../pages/Weather';
import Market from '../pages/Market';
import Community from '../pages/Community';
import Schemes from '../pages/Schemes';
import Transport from '../pages/Transport';
import Consultation from '../pages/Consultation';
import CropDoctor from '../pages/CropDoctor';
import Settings from '../pages/Settings';
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/recommendations" element={<PageTransition><CropRecommendation /></PageTransition>} />
                <Route path="/weather" element={<PageTransition><Weather /></PageTransition>} />
                <Route path="/market" element={<PageTransition><Market /></PageTransition>} />
                <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
                <Route path="/schemes" element={<PageTransition><Schemes /></PageTransition>} />
                <Route path="/transport" element={<PageTransition><Transport /></PageTransition>} />
                <Route path="/consultation" element={<PageTransition><Consultation /></PageTransition>} />
                <Route path="/crop-doctor" element={<PageTransition><CropDoctor /></PageTransition>} />
                <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="*" element={<PageTransition><div className="text-center py-20">Page Not Found</div></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
