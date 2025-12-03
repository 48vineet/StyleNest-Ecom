# StyleNest Ecom

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

**StyleNest Ecom** is a modern, fully responsive e-commerce platform built with the MERN stack. It provides a complete shopping experience with product browsing, cart management, secure authentication, and payment integration.

## Features

- **Responsive UI**: Built with React 19 and Tailwind CSS 4.
- **Shopping Cart**: Full cart functionality (add, remove, update).
- **Authentication**: Secure user login and registration (JWT/Bcrypt).
- **Order Management**: User order history and tracking.
- **Image Optimization**: Cloudinary integration for efficient asset delivery.
- **Payments**: PayPal integration for secure transactions.

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- Redux Toolkit
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary
- Multer

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/48vineet/StyleNest-Ecom.git
   cd StyleNest-Ecom
   ```

2. **Backend Setup**
   Navigate to the backend directory, install dependencies, and configure environment variables.
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in `backend/`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   Open a new terminal, navigate to the frontend directory, and install dependencies.
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file in `frontend/` (optional, default assumes localhost:5000):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the application:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Contributing

Contributions are welcome. Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes.
4. Push to the branch and open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
