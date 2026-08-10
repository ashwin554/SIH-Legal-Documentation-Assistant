const OLLAMA_URL = 'http://localhost:11434';
const MODEL = 'qwen2.5:7b';

async function generateResponse(prompt, systemPrompt) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL,
                prompt: prompt,
                system: systemPrompt,
                stream: false
            }),
            signal: controller.signal
        });
        
        if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Ollama generate error:', error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function chatCompletion(messages) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
        const response = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: MODEL,
                messages: messages,
                stream: false
            }),
            signal: controller.signal
        });

        if (!response.ok) throw new Error(`Ollama API error: ${response.statusText}`);

        const data = await response.json();
        return data.message.content;
    } catch (error) {
        console.error('Ollama chat error:', error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

module.exports = { generateResponse, chatCompletion };
