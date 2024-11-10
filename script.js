document.addEventListener('DOMContentLoaded', function() {
    // ... (previous code remains the same until systemPrompt) ...

    const systemPrompt = `You are a Stable Diffusion prompt engineer. Create a single, comma-separated sentence prompt for a realistic photo of a Japanese female bodybuilder. Include these specifications:
        - Pose: ${parameters.pose}
        - Clothing: ${parameters.clothing}
        - Location: ${parameters.location}
        - Lighting: ${parameters.lighting}
        
        Rules:
        - Format everything as ONE continuous sentence with commas
        - Include muscular definition and proper anatomy details
        - Include lighting and atmosphere details
        - Include professional photography style elements
        - Focus on photorealistic qualities
        - DO NOT use multiple sentences or line breaks
        - DO NOT include negative prompts
        
        Example format:
        realistic photo of muscular woman, standing pose, detailed muscles, professional lighting, [rest of details...]`;

    // ... (rest of the fetch code remains the same) ...

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
            
            // Format everything in a single line with the negative prompt
            const fullPrompt = `${aiGeneratedPrompt.replace(/\n/g, ', ')}\n\nNegative prompt: ${negativePrompt}\n\nSteps: 30, Sampler: DPM++ 2M Karras, CFG scale: 7, Size: 512x768`;

            promptResult.value = fullPrompt;
        } catch (error) {
            console.error('Error:', error);
            promptResult.value = `Error: ${error.message}. Please check your API key and try again.`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Prompt';
        }
    }

    // ... (rest of the code remains the same) ...
}); 