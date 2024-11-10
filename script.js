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
            "cartoon, anime, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, bad anatomy, DeepNegative, facing away, tilted head, Multiple people, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worstquality, low quality, normal quality, jpegartifacts, signature, watermark, username, blurry, bad feet",
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
const photoStyle = document.getElementById('photoStyle');
const lighting = document.getElementById('lighting');
const outfit = document.getElementById('outfit');
const positivePrompt = document.getElementById('positivePrompt');
const negativePrompt = document.getElementById('negativePrompt');
const variantList = document.getElementById('variantList');

// Event Listeners
generateBtn.addEventListener('click', () => {
    const mainPrompt = generator.generatePrompt(
        photoStyle.value,
        lighting.value,
        outfit.value
    );
    
    positivePrompt.value = mainPrompt.positive;
    negativePrompt.value = mainPrompt.negative;

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
                <button onclick="copyToClipboard(this, 'positive')" data-prompt="${variant.positive}">
                    <i class="fas fa-copy"></i> Copy Positive
                </button>
                <button onclick="copyToClipboard(this, 'negative')" data-prompt="${variant.negative}">
                    <i class="fas fa-copy"></i> Copy Negative
                </button>
                <button onclick="sharePrompt('${encodeURIComponent(variant.positive)}')">
                    <i class="fas fa-share-alt"></i> Share
                </button>
            </div>
        </div>
    `).join('');
});

function copyToClipboard(button, promptType) {
    const prompt = button.getAttribute('data-prompt');
    navigator.clipboard.writeText(prompt).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('copy-feedback');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copy-feedback');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function sharePrompt(prompt) {
    const shareData = {
        title: 'AI Image Prompt',
        text: decodeURIComponent(prompt),
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${prompt}&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
    }
}

function generateRandom() {
    const styles = ['candid', 'posed', 'action', 'gym'];
    const lightings = ['natural', 'studio', 'dramatic', 'gym'];
    const outfits = ['workout', 'competition', 'casual', 'sportswear'];

    photoStyle.value = styles[Math.floor(Math.random() * styles.length)];
    lighting.value = lightings[Math.floor(Math.random() * lightings.length)];
    outfit.value = outfits[Math.floor(Math.random() * outfits.length)];

    generateBtn.click();
}

// Generate initial prompt on page load
window.addEventListener('DOMContentLoaded', () => {
    generateBtn.click();
}); 
