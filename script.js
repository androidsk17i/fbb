document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        generateBtn: document.getElementById('generateBtn'),
        copyBtn: document.getElementById('copyBtn'),
        promptResult: document.getElementById('promptResult'),
        apiKeyInput: document.getElementById('apiKeyInput')
    };

    const config = {
        API_URL: 'https://api.groq.com/openai/v1/chat/completions',
        MODEL: 'mixtral-8x7b-32768',
        NEGATIVE_PROMPT: "deformed, unrealistic proportions, bad anatomy, watermark, signature, low quality, blurry"
    };

    // Load saved API key
    elements.apiKeyInput.value = localStorage.getItem('groqApiKey') || '';
    elements.apiKeyInput.addEventListener('change', () => {
        localStorage.setItem('groqApiKey', elements.apiKeyInput.value);
    });

    async function generateAIPrompt(parameters) {
        const apiKey = elements.apiKeyInput.value.trim();
        if (!apiKey) throw new Error('Please enter your Groq API key');

        const systemPrompt = `Create a single, comma-separated sentence prompt for a realistic photo of a Japanese female bodybuilder with:
        Pose: ${parameters.pose}, Clothing: ${parameters.clothing}, Location: ${parameters.location}, Lighting: ${parameters.lighting}.
        Include: muscular definition, proper anatomy, lighting details, professional photography style.
        Format as ONE continuous sentence with commas. Focus on photorealistic qualities.`;

        try {
            const response = await fetch(config.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: config.MODEL,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: "Generate the prompt now." }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'API request failed');
            }

            const data = await response.json();
            if (!data?.choices?.[0]?.message?.content) {
                throw new Error('Invalid API response format');
            }

            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async function generatePrompt() {
        const parameters = {
            pose: document.getElementById('pose').value,
            clothing: document.getElementById('clothing').value,
            location: document.getElementById('location').value,
            lighting: document.getElementById('lighting').value
        };

        elements.generateBtn.disabled = true;
        elements.generateBtn.textContent = 'Generating...';
        elements.promptResult.value = 'Generating prompt...';

        try {
            const aiGeneratedPrompt = await generateAIPrompt(parameters);
            const fullPrompt = `${aiGeneratedPrompt.replace(/\n/g, ', ')}\n\nNegative prompt: ${config.NEGATIVE_PROMPT}\n\nSteps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7, Size: 512x768`;
            elements.promptResult.value = fullPrompt;
        } catch (error) {
            elements.promptResult.value = `Error: ${error.message}. Please check your API key and try again.`;
        } finally {
            elements.generateBtn.disabled = false;
            elements.generateBtn.textContent = 'Generate Prompt';
        }
    }

    function copyToClipboard() {
        elements.promptResult.select();
        document.execCommand('copy');
        
        const originalText = elements.copyBtn.textContent;
        elements.copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            elements.copyBtn.textContent = originalText;
        }, 2000);
    }

    // Event Listeners
    elements.generateBtn.addEventListener('click', generatePrompt);
    elements.copyBtn.addEventListener('click', copyToClipboard);
}); 