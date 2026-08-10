const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const templatesPath = path.join(__dirname, '..', 'data', 'templates.json');

router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(templatesPath, 'utf8');
        const templates = JSON.parse(data);
        const { category } = req.query;
        
        if (category) {
            const filtered = templates.filter(t => t.category.toLowerCase() === category.toLowerCase());
            return res.json(filtered);
        }
        res.json(templates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error loading templates' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const data = fs.readFileSync(templatesPath, 'utf8');
        const templates = JSON.parse(data);
        const template = templates.find(t => t.id === req.params.id);
        
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }
        res.json(template);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
