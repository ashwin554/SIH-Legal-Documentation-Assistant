const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/templates');
const documentRoutes = require('./routes/documents');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/ai', aiRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Legal Documentation Assistant Backend is ready.`);
});
