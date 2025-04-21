import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer to store uploaded files in the 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        const userId = req.body.userId;
        console.log("userId ", userId);
        cb(null, `${userId}.jpg`);
    },
});

const upload = multer({ storage: storage });

app.post('/api/auth/uploadProfilePicture', upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const profilePictureUrl = `/uploads/${req.file.filename}`;
    console.log("file_name", req.file.filename);

    res.status(200).json({ profilePictureUrl: profilePictureUrl });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

app.use((req, res, next) => {
  const routes = app._router.stack
      .filter(r => r.route)
      .map(r => `${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
  console.log('Available Routes:\n', routes.join('\n'));
  next();
});

app.get('/', (req, res) => res.send('API is running.'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));