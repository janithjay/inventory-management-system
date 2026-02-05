# Inventory Management System

A full-stack web application for managing inventory with real-time updates, analytics, and a modern user interface. This system allows users to track products, monitor stock levels, and analyze inventory data with interactive charts and dashboards.

## Features

- 🔐 **User Authentication** - Secure registration and login system with JWT tokens
- 📦 **Product Management** - Create, read, update, and delete products
- 📊 **Analytics Dashboard** - Visual analytics with charts and inventory insights
- 🔄 **Real-time Updates** - Socket.io integration for live inventory updates
- 📱 **Responsive Design** - Modern UI built with React and Tailwind CSS
- 🎨 **Beautiful Charts** - Interactive data visualization using Recharts
- 🔍 **Product Search & Filter** - Easy product discovery and management

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Query** - Data fetching and caching
- **Recharts** - Chart and data visualization
- **Socket.io Client** - Real-time communication
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Socket.io** - Real-time bidirectional communication
- **Zod** - Schema validation

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/janithjay/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   > **Note**: Replace `your_mongodb_connection_string` with your actual MongoDB connection string (MongoDB Atlas or local MongoDB) and `your_jwt_secret_key` with a secure random string.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server** (in a separate terminal)
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173` (default Vite port)

3. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
inventory-management-system/
├── server/                 # Backend code
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── socket/            # Socket.io handlers
│   ├── validators/        # Input validation
│   └── index.js           # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   │   ├── analytics/     # Analytics components
│   │   ├── products/      # Product components
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── Products.tsx   # Product management
│   │   ├── Analytics.tsx  # Analytics page
│   │   ├── Login.tsx      # Login page
│   │   └── Registration.tsx # Registration page
│   ├── services/          # API services
│   ├── store/             # State management (Zustand)
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── .env                   # Environment variables (create this)
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### Products
- `GET /products` - Get all products
- `POST /products` - Create a new product
- `PUT /products/:name` - Update a product
- `DELETE /products/:name` - Delete a product

## Usage

1. **Registration**: Create a new account on the registration page
2. **Login**: Sign in with your credentials
3. **Dashboard**: View inventory overview and key metrics
4. **Products**: Add, edit, or delete products from your inventory
5. **Analytics**: Monitor inventory trends and product statistics

## Troubleshooting

### White Screen Error

If you encounter a white screen when opening the application without any errors:

**Solution:**
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Execute the following command:
   ```javascript
   localStorage.clear()
   ```
4. Reload the browser

This clears the local storage and resolves authentication state issues.

### MongoDB Connection Error

If you see MongoDB connection errors:
- Verify your MongoDB connection string in the `.env` file
- Ensure MongoDB service is running (if using local MongoDB)
- Check your network connection (if using MongoDB Atlas)
- Verify that your IP address is whitelisted in MongoDB Atlas

### Port Already in Use

If you get an error that the port is already in use:
- Change the `PORT` in your `.env` file
- Or kill the process using the port:
  ```bash
  # On Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # On Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server
- `npm run lint` - Run ESLint for code quality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Project Link: [https://github.com/janithjay/inventory-management-system](https://github.com/janithjay/inventory-management-system)

---

Made with ❤️ by [janithjay](https://github.com/janithjay)
