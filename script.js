document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const promptResult = document.getElementById('promptResult');

    // Replace with your OpenRouter API key
    const OPENROUTER_API_KEY = 'YOUR_API_KEY_HERE';
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const basePrompt = "realistic full body photo of beautiful chubby japanese female muscular bodybuilder, amateur photo quality";
    const negativePrompt = "deformed, unrealistic proportions, bad anatomy, watermark, signature, low quality, blurry";

    async function generateAIPrompt(parameters) {
        const systemPrompt = `You are a Stable Diffusion prompt engineer specializing in creating detailed prompts for generating realistic photos of female bodybuilders. 
        Create a detailed prompt that incorporates these elements: ${JSON.stringify(parameters)}. 
        The prompt should be optimized for photorealistic results.`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.href,
                'X-Title': 'Bodybuilder Prompt Generator'
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3-sonnet',
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Generate a detailed Stable Diffusion prompt incorporating the specified parameters. Focus on photorealistic quality and proper anatomical details." }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('AI API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
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

        try {
            const aiGeneratedPrompt = await generateAIPrompt(parameters);
            
            const fullPrompt = `${aiGeneratedPrompt}

Negative prompt: ${negativePrompt}

Steps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7, Size: 512x768`;

            promptResult.value = fullPrompt;
        } catch (error) {
            console.error('Error generating prompt:', error);
            promptResult.value = 'Error generating prompt. Please try again.';
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