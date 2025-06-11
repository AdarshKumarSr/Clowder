const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection
const bodyParser = require("body-parser");
const path = require('path'); // Path module for handling file paths

// Routes
const authRoutes = require('./routes/auth'); // Import auth routes
// const courseRoutes = require('./routes/course'); // Import course routes
const compilerRoutes = require('./routes/compiler');
const complexityRoutes = require('./routes/complexity');
const visualizationRoutes = require('./routes/visualization');
const runTestsRoutes = require('./routes/runTests');
// const getProblemsRoutes = require('./routes/getProblems');
// const buildcourseRoutes = require('./routes/course01');
// const getCoursesRoutes = require('./routes/course01')
const courseRoutes = require("./routes/course.route"); // dummy course onichaaa !!!


const { log } = require('console');

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initialize app
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // Frontend runs on port 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows cookies, if needed
}));

app.use(express.json()); // For parsing JSON requests
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS)

// Connect to MongoDB
connectDB(); // Call the function to connect to the database

// API Routes
app.use('/api/auth', authRoutes); // Register the auth route
// app.use('/api/courses', courseRoutes); // Register the course route (corrected this line)
app.use('/api/compiler', compilerRoutes); // Compiler route
app.use('/api/complexity', complexityRoutes); // Complexity analysis route
app.use('/api/visualize', visualizationRoutes); // Visualization API
app.use('/api/runtests', runTestsRoutes); // Run tests for submission of the type 2 lesson
// app.use('/api/problems', getProblemsRoutes); // To get the problems
// app.use('/api/create-course', buildcourseRoutes);
// app.use('/api/courses', getCoursesRoutes);
app.use("/api/course", courseRoutes);   // Dummy course onichaa !!!! ..... 


// Catch-all for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
