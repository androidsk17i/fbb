class PromptGenerator {
    constructor() {
        this.basePrompts = [
            "amateur photograph of a Japanese female bodybuilder",
            "candid shot of a muscular Japanese woman",
            "realistic photo of a Japanese female athlete",
            "authentic gym photo of a Japanese female bodybuilder"
        ];

        this.bodyDescriptors = [
            "chubby muscular build",
            "strong athletic physique",
            "powerful muscular frame",
            "thick muscular body"
        ];

        this.poses = {
            candid: [
                "casually flexing",
                "natural stance",
                "caught mid-movement",
                "candid expression"
            ],
            posed: [
                "professional pose",
                "competition stance",
                "showing muscles",
                "confident pose"
            ],
            action: [
                "lifting weights",
                "during workout",
                "mid-exercise",
                "training session"
            ],
            gym: [
                "at the gym",
                "using equipment",
                "between sets",
                "preparing to lift"
            ]
        };

        this.lightingEffects = {
            natural: [
                "soft natural lighting",
                "daylight through windows",
                "outdoor lighting",
                "ambient light"
            ],
            studio: [
                "studio lighting setup",
                "professional lighting",
                "controlled lighting",
                "bright even lighting"
            ],
            dramatic: [
                "dramatic shadows",
                "contrasting light",
                "moody lighting",
                "atmospheric lighting"
            ],
            gym: [
                "fluorescent gym lighting",
                "overhead gym lights",
                "industrial lighting",
                "practical gym lighting"
            ]
        };

        this.outfitDescriptions = {
            workout: [
                "wearing workout clothes",
                "in gym attire",
                "sports bra and leggings",
                "practical training outfit"
            ],
            competition: [
                "competition bikini",
                "posing suit",
                "competition outfit",
                "stage wear"
            ],
            casual: [
                "casual athletic wear",
                "comfortable clothes",
                "everyday fitness wear",
                "relaxed outfit"
            ],
            sportswear: [
                "branded sportswear",
                "athletic gear",
                "performance wear",
                "sports outfit"
            ]
        };

        this.negativePrompts = [
            "deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, disconnected head, malformed hands, long neck, mutated hands and fingers, bad hands, missing fingers, cropped, worst quality, low quality, mutation, poorly drawn, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, missing fingers, fused fingers, abnormal eye proportion, Abnormal hands, abnormal legs, abnormal feet, abnormal fingers",
            "cartoon, anime, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, bad anatomy, DeepNegative, facing away, tilted head, Multiple people, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worstquality, low quality, normal quality, jpegartifacts, signature, watermark, username, blurry, bad feet, cropped, poorly drawn hands, poorly drawn face, mutation, deformed, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, extra fingers, fewer digits, extra limbs, extra arms, extra legs, malformed limbs, fused fingers, too many fingers, long neck, cross-eyed, mutated hands, polar lowres, bad body, bad proportions, gross proportions, text, error, missing fingers, missing arms, missing legs, extra digit",
            "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face"
        ];
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    generatePrompt(style, lighting, outfit) {
        const basePrompt = this.getRandomElement(this.basePrompts);
        const bodyDescriptor = this.getRandomElement(this.bodyDescriptors);
        const pose = this.getRandomElement(this.poses[style]);
        const lightingEffect = this.getRandomElement(this.lightingEffects[lighting]);
        const outfitDescription = this.getRandomElement(this.outfitDescriptions[outfit]);
        const negativePrompt = this.getRandomElement(this.negativePrompts);

        return {
            positive: `${basePrompt}, ${bodyDescriptor}, ${pose}, ${lightingEffect}, ${outfitDescription}, amateur photography style, realistic, 8k quality`,
            negative: negativePrompt
        };
    }

    generateVariants(style, lighting, outfit) {
        const variants = [];
        for (let i = 0; i < 3; i++) {
            variants.push(this.generatePrompt(style, lighting, outfit));
        }
        return variants;
    }
}

// Initialize the generator
const generator = new PromptGenerator();

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const promptResult = document.getElementById('promptResult');
const copyBtn = document.getElementById('copyBtn');
const variantList = document.getElementById('variantList');
const photoStyle = document.getElementById('photoStyle');
const lighting = document.getElementById('lighting');
const outfit = document.getElementById('outfit');

// Event Listeners
generateBtn.addEventListener('click', () => {
    const mainPrompt = generator.generatePrompt(
        photoStyle.value,
        lighting.value,
        outfit.value
    );
    
    document.getElementById('positivePrompt').value = mainPrompt.positive;
    document.getElementById('negativePrompt').value = mainPrompt.negative;

    const variants = generator.generateVariants(
        photoStyle.value,
        lighting.value,
        outfit.value
    );
    
    variantList.innerHTML = variants.map(variant => `
        <div class="variant-item">
            <div class="prompt-section">
                <h4>Positive Prompt:</h4>
                <p>${variant.positive}</p>
            </div>
            <div class="prompt-section">
                <h4>Negative Prompt:</h4>
                <p>${variant.negative}</p>
            </div>
            <div class="button-group">
                <button onclick="copyToClipboard(this, 'positive')" data-prompt="${variant.positive}">Copy Positive</button>
                <button onclick="copyToClipboard(this, 'negative')" data-prompt="${variant.negative}">Copy Negative</button>
                <button onclick="sharePrompt(this)" data-prompt="${variant.positive}">Share</button>
            </div>
        </div>
    `).join('');
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptResult.value);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy Prompt';
    }, 2000);
});

function copyToClipboard(button, promptType) {
    const prompt = button.getAttribute('data-prompt');
    navigator.clipboard.writeText(prompt);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy Variant';
    }, 2000);
}

function sharePrompt(button) {
    const prompt = button.getAttribute('data-prompt');
    const shareData = {
        title: 'AI Image Prompt',
        text: prompt,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(prompt)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
    }
}

// Random generation function
function generateRandom() {
    const styles = ['candid', 'posed', 'action', 'gym'];
    const lightings = ['natural', 'studio', 'dramatic', 'gym'];
    const outfits = ['workout', 'competition', 'casual', 'sportswear'];

    photoStyle.value = styles[Math.floor(Math.random() * styles.length)];
    lighting.value = lightings[Math.floor(Math.random() * lightings.length)];
    outfit.value = outfits[Math.floor(Math.random() * outfits.length)];

    generateBtn.click();
} 