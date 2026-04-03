# QuickBite - Food Delivery Application

A full-stack food delivery application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **Restaurant Browsing**: Browse restaurants with filtering and search
- **Menu Management**: View detailed menus with categories
- **Shopping Cart**: Add/remove items with real-time updates
- **Order Management**: Place orders and track order history
- **Favorites System**: Save favorite restaurants
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic cart and order status updates

## 🛠️ Technology Stack

### Frontend
- React.js 18.2.0
- React Router DOM 6.9.0
- Context API for state management
- Axios for HTTP requests
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 7.0.3
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/quickbite-food-delivery.git
   cd quickbite-food-delivery
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   Create `.env` file in backend directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the Application**
   
   **Option 1: Use the start script (Recommended)**
   ```bash
   # From root directory
   start-dev.bat
   ```
   
   **Option 2: Manual startup**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: http://localhost:5001/api

## 📱 Screenshots

### Home Page
![Home Page](screenshots/home-page.png)

### Restaurant Details
![Restaurant Details](screenshots/restaurant-details.png)

### Shopping Cart
![Shopping Cart](screenshots/shopping-cart.png)

## 🧪 Testing

Run tests for backend:
```bash
cd backend
npm test
```

Run tests for frontend:
```bash
cd frontend
npm test
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create restaurant (admin)

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders/user/:id` - Get user orders
- `PUT /api/orders/:id/status` - Update order status

## 🔧 Project Structure

```
quickbite-food-delivery/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
└── README.md
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Set project root to `frontend`
2. Set environment variable `REACT_APP_API_URL` to your backend API base URL (example: `https://your-backend-domain.com/api`)
3. Build command: `npm run build`
4. Output directory: `build`
5. Keep `frontend/vercel.json` so client-side routes (like `/login`, `/profile`) rewrite to `index.html`

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy from GitHub repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB for the flexible database
- Express.js for the robust backend framework
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**