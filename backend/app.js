const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const connectDB = require('./db/connect')

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();



// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;




const start = async()=>{

    try{
        connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch(err)
    {
        console.log(err);
    }
}

start();

