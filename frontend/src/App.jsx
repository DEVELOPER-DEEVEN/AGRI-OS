import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AnimatedRoutes from './components/AnimatedRoutes';

import VoiceAssistant from './components/VoiceAssistant';

// Page imports are now handled in AnimatedRoutes.jsx


const App = () => { // Changed to arrow function
  return (
    <Router>
      <Layout>
        {/* AnimatedRoutes now acts as a wrapper for individual routes */}
        <AnimatedRoutes />
        <VoiceAssistant />
      </Layout>
    </Router>
  );
}

export default App;
