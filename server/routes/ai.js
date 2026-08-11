const express = require('express');
const authMiddleware = require('../middleware/auth');
const { generateResponse, chatCompletion } = require('../services/ollama');

const router = express.Router();
router.use(authMiddleware);

router.post('/draft', async (req, res) => {
    try {
        const { prompt, context } = req.body;
        const sysPrompt = "You are an expert Indian legal document drafter. Write professional, precise, and legally sound documents according to Indian laws such as the Indian Contract Act 1872. Ensure proper formatting with headings and clear clauses.";
        
        const fullPrompt = `Context: ${context || 'None'}\n\nDraft request: ${prompt}`;
        const response = await generateResponse(fullPrompt, sysPrompt);
        
        res.json({ content: response });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

router.post('/review', async (req, res) => {
    try {
        const { content } = req.body;
        const sysPrompt = "You are a seasoned Indian corporate lawyer. Review the following legal document. Identify risks, missing standard clauses, compliance issues with Indian laws, and ambiguities. Provide actionable suggestions in a clear bulleted list.";
        
        const response = await generateResponse(content, sysPrompt);
        res.json({ suggestions: response });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

router.post('/suggest', async (req, res) => {
    try {
        const { context, type } = req.body;
        const sysPrompt = "You are a legal assistant specializing in Indian law. Suggest relevant standard clauses based on the given document type and context.";
        
        const fullPrompt = `Document Type: ${type}\nContext: ${context}\nSuggest key clauses that should be included.`;
        const response = await generateResponse(fullPrompt, sysPrompt);
        
        res.json({ clauses: response });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

router.post('/chat', async (req, res) => {
    try {
        const { message, history, type } = req.body;
        
        let sysContent = "You are an AI-Powered Legal Documentation Assistant specialized in Indian law. Provide accurate, professional, and helpful legal information. Note: You are an AI and must advise users to consult a qualified human lawyer for formal legal representation.";
        
        if (type !== 'qa') {
            sysContent = "You are an expert Legal Draftsman specializing in Indian law. You are speaking with a user who is using a document editor. When asked to draft or revise a document, output ONLY the raw document text formatted in Markdown. Do NOT include any conversational filler, greetings, explanations, disclaimers, or advice whatsoever (e.g., do not say 'Here is the draft', 'Please note', 'Consult a lawyer', etc.). Start directly with the document title and end exactly after the signature blocks.";
        }
        
        const messages = [
            { role: 'system', content: sysContent },
            ...(history || []),
            { role: 'user', content: message }
        ];
        
        const response = await chatCompletion(messages);
        res.json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

router.post('/enhance', async (req, res) => {
    try {
        const { content } = req.body;
        const sysPrompt = "You are a legal editor. Transform the following plain English text into formal, professional legal language suitable for an Indian legal document, while preserving the original intent.";
        
        const response = await generateResponse(content, sysPrompt);
        res.json({ content: response });
    } catch (error) {
        res.status(500).json({ error: 'AI processing failed' });
    }
});

module.exports = router;
