const express = require('express');
const app = express();
const connectDb = require('./utils/db');
const authRoutes = require('./routes/user-routes');
const trainRoutes = require('./routes/train-routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies and authorization headers
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/train', trainRoutes);

connectDb().then(async () => {
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    })
}).catch((error) => {
    console.log(error);
});