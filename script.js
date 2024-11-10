document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const promptResult = document.getElementById('promptResult');
    const apiKeyInput = document.getElementById('apiKeyInput');

    // Load saved API key if it exists
    apiKeyInput.value = localStorage.getItem('openRouterApiKey') || '';

    // Save API key when it changes
    apiKeyInput.addEventListener('change', function() {
        localStorage.setItem('openRouterApiKey', apiKeyInput.value);
    });

    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    const negativePrompt = "deformed, unrealistic proportions, bad anatomy, watermark, signature, low quality, blurry";

    async function generateAIPrompt(parameters) {
        const apiKey = apiKeyInput.value.trim();
        
        if (!apiKey) {
            throw new Error('Please enter your OpenRouter API key');
        }

        const systemPrompt = `You are a Stable Diffusion prompt engineer. Create a detailed prompt for a realistic photo of a Japanese female bodybuilder with these specifications:
        - Pose: ${parameters.pose}
        - Clothing: ${parameters.clothing}
        - Location: ${parameters.location}
        - Lighting: ${parameters.lighting}
        
        Focus on creating a photorealistic prompt that emphasizes:
        - Muscular definition and proper anatomy
        - Realistic lighting and atmosphere
        - Professional photography style
        - Natural and realistic body proportions
        
        Format the prompt in a way that's optimized for Stable Diffusion.`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Bodybuilder Prompt Generator'
                },
                body: JSON.stringify({
                    model: 'anthropic/claude-3-sonnet',
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: "Generate a detailed Stable Diffusion prompt based on the given parameters." }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'API request failed');
            }

            const data = await response.json();
            
            // Add error checking for the response data
            if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }

            // Log the response for debugging
            console.log('API Response:', data);

            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Full error:', error);
            throw new Error(`API Error: ${error.message}`);
        }
    }

    async function generatePrompt() {
        const parameters = {
            pose: document.getElementById('pose').value,
            clothing: document.getElementById('clothing').value,
            location: document.getElementById('location').value,
            lighting: document.getElementById('lighting').value
        };

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        promptResult.value = 'Generating prompt...';

        try {
            const aiGeneratedPrompt = await generateAIPrompt(parameters);
            
            const fullPrompt = `${aiGeneratedPrompt}

Negative prompt: ${negativePrompt}

Steps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7, Size: 512x768`;

            promptResult.value = fullPrompt;
        } catch (error) {
            console.error('Error:', error);
            promptResult.value = `Error: ${error.message}. Please check your API key and try again.`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Prompt';
        }
    }

    generateBtn.addEventListener('click', generatePrompt);

    copyBtn.addEventListener('click', function() {
        promptResult.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}); 