# Agri OS - Enterprise Agriculture Platform

<div align="center">

![Agri OS Banner](https://images.unsplash.com/photo-1625246333195-f8196812c850?q=80&w=1200&auto=format&fit=crop)

### *The Operating System for Modern Agriculture*

[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge&logo=opensource)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React_18-000000?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-000000?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-000000?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

[View Live Demo](https://agri-os-demo.vercel.app) · [Documentation](https://github.com/DEVELOPER-DEEVEN/AGRI-OS/wiki) · [Report Issue](https://github.com/DEVELOPER-DEEVEN/AGRI-OS/issues)

</div>

---

## Executive Summary

**Agri OS** is a comprehensive digital ecosystem designed to optimize agricultural operations through data-driven insights and direct market integration. It serves as a unified platform bridging the gap between farmers, experts, and the marketplace, utilizing advanced technologies such as Computer Vision and Real-time Analytics.

---

## User Interface Documentation

This section provides a detailed overview of every module, interface, and control element within the Agri OS platform.

### 1. Global Navigation & Controls
Located in the sidebar (desktop) or drawer (mobile), these controls provide system-wide access.

| Control Element | Functionality |
| :--- | :--- |
| **Dashboard** | Navigates to the central hub displaying high-level metrics and alerts. |
| **Crop Recommendation** | Accesses the predictive modeling tool for crop selection. |
| **Weather** | Opens the detailed meteorological forecast interface. |
| **Mandi Prices** | Navigates to the real-time marketplace and trading platform. |
| **Community** | Accesses the social forum and AI chatbot. |
| **Schemes** | Lists government subsidies and insurance programs. |
| **Transport** | Opens the logistics and vehicle booking module. |
| **Expert Consultation** | Connects users with certified agronomists. |
| **Crop Doctor** | Accesses the AI-powered disease diagnosis tool. |
| **Voice Assistant** | Floating microphone button that activates voice command recognition for hands-free navigation. |
| **Language Switcher** | Dropdown menu to toggle the system language (English, Hindi, Telugu, etc.). |

### 2. Dashboard Module
The landing page providing an immediate operational overview.

*   **Get Started Button**: The primary call-to-action. Initiates the user journey by redirecting to the Crop Recommendation engine.
*   **News Ticker**: A scrolling marquee displaying critical alerts (e.g., heavy rainfall warnings, subsidy deadlines).
*   **Quick Stats Cards**: Read-only displays showing current Crop Health status, Temperature, and Market Trends.

### 3. Mandi Prices (Marketplace) Module
A comprehensive trading interface for agricultural produce.

*   **Buy / Sell Tabs**: Toggles the interface between the Buyer View (browsing listings) and Seller View (listing creation).
*   **Search Input**: A text field to filter market data by crop name or location.
*   **Filter Button**: Opens advanced filtering options (e.g., by distance, price range).
*   **Microphone Icon**: Activates voice search specific to the market module.
*   **View History Link**: Opens a modal displaying a 7-day price trend graph for the specific crop.
*   **List Crop Button**: Submits the "Sell Your Crop" form data to the backend database.
*   **Mark Sold Button**: Changes the status of a user's listing from 'Active' to 'Sold'.
*   **Edit Button**: Allows modification of an existing listing's price or quantity.

### 4. Crop Doctor Module
An AI-driven diagnostic tool for plant pathology.

*   **Upload Photo Area**: A drag-and-drop zone that also triggers the system file picker to select a crop image.
*   **Analyze Disease Button**: Sends the uploaded image to the backend for processing via the Computer Vision model.
*   **Retake Button**: Clears the current analysis result and resets the upload interface for a new query.

### 5. Expert Consultation Module
A telemedicine-style interface for agricultural advisory.

*   **Video Call Button**: Initiates a secure, WebRTC-based video conference with the selected expert.
*   **Chat Button**: Opens a real-time text messaging modal for asynchronous queries.
*   **Book Appointment Button**: Opens a calendar interface to schedule a future consultation slot.

### 6. Transport Module
A logistics management interface.

*   **Calculate Cost Button**: Computes the estimated shipping price based on the input distance (km) and weight (quintals).
*   **Book Now Button**: Confirms the reservation of a specific transport vehicle.

### 7. Community Module
A social engagement and support platform.

*   **Create Post Button**: Publishes text and media content to the public feed.
*   **Like / Comment Buttons**: Standard social interaction controls for engagement.
*   **Ask AI Input**: A text field to submit natural language queries to the integrated LLM chatbot.
*   **Voice Input (Chat)**: Activates speech-to-text for the chatbot interface.

### 8. Schemes Module
A directory of government aid programs.

*   **Apply Now Button**: Redirects the user to the external official government portal for the respective scheme.
*   **Category Chips**: Filter buttons to narrow down schemes by type (e.g., Insurance, Soil Health).

---

## Technical Architecture

Agri OS is built on a robust, scalable stack designed for performance and reliability.

### Frontend Architecture
*   **Framework**: React.js 18 with Vite for high-performance rendering.
*   **Styling Engine**: Tailwind CSS for a utility-first, responsive design system.
*   **Animation**: Framer Motion for fluid UI transitions.
*   **Data Visualization**: Recharts for rendering complex analytical graphs.
*   **Internationalization**: i18next for seamless multilingual support.

### Backend Architecture
*   **Runtime**: Node.js with Express.js framework.
*   **API Integration**:
    *   **Open-Meteo**: For high-precision weather data.
    *   **Web Speech API**: For native browser-based voice recognition.

---

## Installation & Deployment

### Local Development Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/DEVELOPER-DEEVEN/AGRI-OS.git
    ```

2.  **Initialize Backend**
    ```bash
    cd backend
    npm install
    node server.js
    ```

3.  **Initialize Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

## License

This project is distributed under the **MIT License**.

---

<div align="center">
  <b>Agri OS</b> &copy; 2025. All Rights Reserved.
</div>
