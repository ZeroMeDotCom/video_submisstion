const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRoute);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
