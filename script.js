class PromptGenerator {
    constructor() {
        this.basePrompts = [
            "casual smartphone photo of a Japanese female bodybuilder",
            "Instagram-style photo of a muscular Japanese woman",
            "candid social media photo of a Japanese female athlete",
            "Facebook-style photo of a Japanese female bodybuilder",
            "amateur phone camera shot of a muscular Japanese woman",
            "spontaneous photo of a Japanese female bodybuilder"
        ];

        this.bodyDescriptors = [
            "chubby but muscular build",
            "thick muscular physique",
            "strong but natural-looking muscles",
            "powerfully built but feminine",
            "athletic and chunky build",
            "muscular but soft features"
        ];

        this.poses = {
            candid: [
                "casually smiling at camera",
                "natural relaxed pose",
                "caught in mid-laugh",
                "candid mirror selfie",
                "spontaneous pose",
                "casual phone selfie"
            ],
            posed: [
                "friendly posed selfie",
                "casual standing pose",
                "relaxed mirror pose",
                "natural smiling pose",
                "casual peace sign pose",
                "friendly wave at camera"
            ],
            action: [
                "walking down the street",
                "shopping at the mall",
                "eating at a cafe",
                "hanging out with friends",
                "casual stretching",
                "window shopping"
            ],
            gym: [
                "leaving the gym",
                "arriving at the gym",
                "gym bathroom mirror selfie",
                "drinking protein shake",
                "carrying gym bag",
                "post-workout selfie"
            ]
        };

        this.lightingEffects = {
            natural: [
                "natural daylight",
                "golden hour sunlight",
                "soft window lighting",
                "outdoor evening light",
                "cloudy day lighting",
                "morning sunlight"
            ],
            studio: [
                "indoor room lighting",
                "home lighting",
                "mall lighting",
                "cafe lighting",
                "restaurant lighting",
                "store lighting"
            ],
            dramatic: [
                "sunset lighting",
                "city street lights",
                "neon sign lighting",
                "evening golden hour",
                "shopping mall lighting",
                "cafe window lighting"
            ],
            gym: [
                "parking lot lighting",
                "gym entrance lighting",
                "locker room lighting",
                "gym lobby lighting",
                "gym mirror lighting",
                "gym bathroom lighting"
            ]
        };

        this.outfitDescriptions = {
            workout: [
                "wearing casual workout clothes",
                "in comfortable gym wear",
                "wearing loose fitting workout gear",
                "in baggy training clothes",
                "wearing oversized workout shirt",
                "in comfortable training outfit"
            ],
            competition: [
                "wearing casual athletic wear",
                "in comfortable sportswear",
                "wearing trendy athletic clothes",
                "in fashionable gym wear",
                "wearing popular athletic brand",
                "in stylish workout clothes"
            ],
            casual: [
                "wearing everyday clothes",
                "in jeans and t-shirt",
                "wearing casual summer dress",
                "in comfortable street wear",
                "wearing trendy casual outfit",
                "in baggy comfortable clothes"
            ],
            sportswear: [
                "wearing athleisure outfit",
                "in casual sports clothes",
                "wearing trendy sportswear",
                "in comfortable athletic wear",
                "wearing popular sports brand",
                "in casual athletic clothes"
            ]
        };

        this.negativePrompts = [
            "professional photography, studio photography, high end camera, professional camera, dslr, perfect composition, oversaturated, overexposed, perfect lighting, (professional lighting), staged photo, posed photo, professional model, skinny, thin, low body fat, deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, long neck, mutated hands and fingers, bad hands",
            "professional photo, perfect photo, perfect face, perfect eyes, perfect lighting, studio lighting, professional studio, expensive camera, high end photography, advertisement photo, commercial photo, magazine photo, catalog photo, portfolio photo, stock photo, photoshoot, posed photo, staged photo, artificial pose, artificial smile, professional model, skinny, thin, low body fat",
            "perfect composition, perfect framing, rule of thirds, professional grade, high end, luxury, expensive, high fashion, glamour, advertisement quality, commercial quality, magazine quality, catalog quality, portfolio quality, stock photo quality, photoshoot quality, staged quality, artificial quality, professional model quality"
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
