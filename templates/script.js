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

        return `${basePrompt}, ${bodyDescriptor}, ${pose}, ${lightingEffect}, ${outfitDescription}, amateur photography style, realistic, 8k quality`;
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
    promptResult.value = mainPrompt;

    // Generate and display variants
    const variants = generator.generateVariants(
        photoStyle.value,
        lighting.value,
        outfit.value
    );
    
    variantList.innerHTML = variants.map(variant => `
        <div class="variant-item">
            <p>${variant}</p>
            <button onclick="copyToClipboard(this)" data-prompt="${variant}">Copy Variant</button>
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

function copyToClipboard(button) {
    const prompt = button.getAttribute('data-prompt');
    navigator.clipboard.writeText(prompt);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy Variant';
    }, 2000);
} 