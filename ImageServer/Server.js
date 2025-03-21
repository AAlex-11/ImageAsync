import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS for all routes
app.use(cors());

/*
app.use(cors({
    origin: 'http://your-frontend-domain.com', // Allow only specific origins
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
*/

// Serve static files from a directory (e.g., an "images" folder)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Example route to serve an image with CORS headers
app.get('/image', (req, res) => {
    const imagePath = path.join(__dirname, 'images', 'Frontend.png');
    res.sendFile(imagePath);
});



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//http://localhost:3000/images/Frontend.png
//http://localhost:3000/image