# Courier Parcel Tracking System

A modern courier management and parcel tracking system built with **React** frontend and **Node.js/Express** backend, featuring real-time parcel status updates via **Socket.IO** and live parcel location tracking on **Google Maps**.

---

## Features

- **Parcel Assignment & Status Updates**: Delivery agents can update parcel statuses (`assigned`, `picked-up`, `in-transit`, `delivered`, `failed`).
- **Real-time Notifications**: Customers receive instant updates when parcel status or location changes via WebSockets (Socket.IO).
- **Parcel Tracking on Map**: Customers can track their parcel's live location displayed on Google Maps.
- **Role-based Access**: Separate routes and views for customers, delivery agents, and admins.
- **RESTful API**: Backend built with Express.js and MongoDB.
- **Secure with CORS & Helmet**: Basic security middleware configured.
  
---

## Technology Stack

- Frontend: React, Socket.IO client, Tailwind CSS
- Backend: Node.js, Express.js, Socket.IO server, MongoDB (Mongoose)
- Real-time: Socket.IO for WebSocket communication
- Maps: Google Maps JavaScript API for parcel location visualization

---

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Google Maps API key ([Get API key](https://console.cloud.google.com/apis/credentials))

### Backend

1. Clone the repo and navigate to backend:

   ```bash
   git clone <repo-url>
   cd backend

2. Install dependencies:
    ```bash
    npm install

3. Create .env file with:
    PORT=5000
    MONGO_URI=<your_mongo_connection_string>

4. Start the server:
    ```bash
    npm run dev

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Create .env file with your Google Maps API key:
    REACT_APP_GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>

4. Start React app:
    npm start
