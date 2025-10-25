# QuickBite

A full-stack food delivery application with React frontend and Node.js/Express backend.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

#### Option 1: Using the start script (Recommended)

Run the provided start script to launch both backend and frontend servers:

```bash
# From the root directory
start-dev.bat
```

#### Option 2: Manual startup

Start the backend server:

```bash
# From the backend directory
npm start
```

In a separate terminal, start the frontend server:

```bash
# From the frontend directory
npm start
```

### Troubleshooting

#### Proxy Error

If you encounter a proxy error like:

```
Proxy error: Could not proxy request /api/restaurants/rest2 from localhost:3000 to http://localhost:5001/.
```

This means the backend server is not running. Make sure to:

1. Start the backend server first before the frontend
2. Check if the backend server is running on port 5001
3. Check for any errors in the backend console

The application includes fallback mock data, so some features will still work even if the backend is not available.

## Features

- Browse restaurants
- View restaurant details and menus
- Add items to cart
- Place orders
- User authentication
- Order tracking

## Technologies Used

- **Frontend**: React, Context API, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT