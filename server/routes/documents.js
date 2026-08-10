const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const authMiddleware = require('../middleware/auth');
const { generatePDF } = require('../services/pdf');

const router = express.Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
    try {
        const docs = db.prepare('SELECT * FROM documents WHERE user_id = ? ORDER BY updated_at DESC').all(req.user.id);
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', (req, res) => {
    try {
        const doc = db.prepare('SELECT * FROM documents WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
        if (!doc) return res.status(404).json({ error: 'Document not found' });
        res.json(doc);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', (req, res) => {
    try {
        const { title, content, template_id, status } = req.body;
        const id = uuidv4();
        
        db.prepare(`
            INSERT INTO documents (id, user_id, title, content, template_id, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(id, req.user.id, title, content, template_id, status || 'draft');
        
        const doc = db.prepare('SELECT * FROM documents WHERE id = ?').get(id);
        res.status(201).json(doc);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const { title, content, status } = req.body;
        const result = db.prepare(`
            UPDATE documents 
            SET title = COALESCE(?, title),
                content = COALESCE(?, content),
                status = COALESCE(?, status),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND user_id = ?
        `).run(title, content, status, req.params.id, req.user.id);
        
        if (result.changes === 0) return res.status(404).json({ error: 'Document not found or unauthorized' });
        
        const doc = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id);
        res.json(doc);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const result = db.prepare('DELETE FROM documents WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Document not found' });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id/export/pdf', async (req, res) => {
    try {
        const doc = db.prepare('SELECT * FROM documents WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
        if (!doc) return res.status(404).json({ error: 'Document not found' });
        
        const pdfBuffer = await generatePDF(doc);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${doc.title.replace(/\s+/g, '_')}.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});

module.exports = router;
