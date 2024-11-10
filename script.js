const locations = [
    "at home", "in a local gym", "at a park", "in a residential area",
    "at a train station", "in front of a convenience store", "at a shopping mall",
    "in a parking lot", "at a crosswalk", "near vending machines",
    "in a coffee shop", "at a supermarket", "in a quiet neighborhood",
    "at a bus stop", "in front of a traditional Japanese house", "at a temple entrance",
    "near a subway exit", "at a local restaurant", "in a garden", "on a residential balcony"
];

const poses = [
    "standing naturally", "casual pose", "relaxed stance",
    "walking", "sitting on a bench", "leaning against a wall",
    "looking at phone", "carrying shopping bags", "waiting for train",
    "adjusting hair", "checking watch", "stretching lightly",
    "tying shoelaces", "window shopping", "drinking water",
    "fixing clothes", "browsing phone", "putting on jacket",
    "checking reflection", "waving to someone"
];

const clothes = [
    "oversized t-shirt and jeans", "casual dress", "workout leggings and tank top",
    "hoodie and sweatpants", "denim jacket and shorts", "summer dress",
    "cardigan and skirt", "athletic wear", "casual blouse and pants",
    "crop top and high-waisted jeans", "polo shirt and khakis", "sweater and leggings",
    "button-up shirt and jeans", "track suit", "sundress and cardigan",
    "tank top and cargo pants", "jersey and shorts", "long sleeve tee and joggers",
    "sleeveless hoodie and shorts", "windbreaker and track pants"
];

const lighting = [
    "natural lighting", "golden hour sunlight", "soft indoor lighting",
    "overcast daylight", "evening lighting", "morning sun",
    "ambient street lighting", "diffused window light", "sunset glow",
    "cloudy day lighting", "fluorescent indoor lights", "dawn lighting",
    "dusk lighting", "storefront lighting", "train station lighting",
    "convenience store lighting", "mall lighting", "cafe lighting",
    "natural backlight", "side lighting"
];

const cameras = [
    "iPhone 13", "iPhone 12", "Samsung Galaxy S21", "Google Pixel 6",
    "iPhone 11", "Samsung Galaxy S20", "iPhone XR", "Sony Xperia 1",
    "OnePlus 9", "iPhone 14", "Samsung Galaxy S22", "Google Pixel 7",
    "Xiaomi Mi 11", "iPhone SE", "Samsung A52", "Huawei P30",
    "iPhone 13 Pro", "Samsung Galaxy S21 Ultra", "Google Pixel 6a",
    "iPhone 12 Pro Max"
];

const compositions = [
    "full body shot", "candid shot", "natural composition",
    "amateur photography", "Instagram style photo", "casual snapshot",
    "spontaneous capture", "lifestyle photo", "documentary style",
    "street photography", "environmental portrait", "authentic moment",
    "natural pose", "unposed shot", "casual portrait",
    "everyday life shot", "slice of life", "real moment capture",
    "natural framing", "candid portrait"
];

const additionalDetails = [
    "(high detailed skin:1.2)", "(realistic face:1.3)", "(subtle muscle definition:1.1)",
    "(natural lighting:1.2)", "(authentic atmosphere:1.1)", "(film grain:0.3)",
    "(photorealistic:1.3)", "(high quality:1.2)", "(sharp focus:1.1)",
    "(natural skin texture:1.2)", "(real life:1.2)", "(subtle shadows:1.1)",
    "(natural expression:1.2)", "(slight jpeg artifacts:0.4)", "(subtle film look:0.5)",
    "(natural color grading:1.1)", "(realistic texture:1.2)", "(lifelike:1.2)",
    "(candid moment:1.1)", "(authentic details:1.2)"
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count = 3) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generatePrompt() {
    const location = getRandomElement(locations);
    const pose = getRandomElement(poses);
    const clothing = getRandomElement(clothes);
    const light = getRandomElement(lighting);
    const camera = getRandomElement(cameras);
    const composition = getRandomElement(compositions);
    const details = getRandomElements(additionalDetails, 5).join(", ");

    const positivePrompt = `realistic photo, ${composition}, chubby japanese female bodybuilder, muscular build but not extreme, ${pose}, ${location}, wearing ${clothing}, ${light}, shot on ${camera}, amateur photography, photorealistic, high quality, sharp focus, natural skin texture, subtle muscle definition, authentic, candid moment, ${details}`;

    const negativePrompt = `anime, cartoon, drawing, painting, sketch, illustration, 3d render, artificial, oversaturated, overexposed, bad anatomy, deformed, disfigured, bad proportions, extra limbs, cloned face, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, cross-eyed, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, bad anatomy, bad proportions, extra limbs, cloned face, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, mutated hands, fused fingers, too many fingers, long neck, username, watermark, signature, text`;

    document.getElementById('positivePrompt').value = positivePrompt;
    document.getElementById('negativePrompt').value = negativePrompt;
}

function copyToClipboard(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');
}

// Generate initial prompt when page loads
document.addEventListener('DOMContentLoaded', generatePrompt);

// Add click event listener to generate button
document.getElementById('generateBtn').addEventListener('click', generatePrompt);

// Theme switcher functionality
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function updateGradient() {
    const hour = new Date().getHours();
    const body = document.body;
    
    // Define gradient colors for different times of day
    let gradientColors;
    
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        // Dark theme gradients
        if (hour >= 5 && hour < 8) { // Dawn
            gradientColors = ['#1a1a1a', '#2d3436', '#3d3d3d'];
        } else if (hour >= 8 && hour < 12) { // Morning
            gradientColors = ['#1a1a1a', '#2c3e50', '#34495e'];
        } else if (hour >= 12 && hour < 16) { // Afternoon
            gradientColors = ['#1a1a1a', '#2d3436', '#2c3e50'];
        } else if (hour >= 16 && hour < 19) { // Evening
            gradientColors = ['#1a1a1a', '#2c3e50', '#2d3436'];
        } else { // Night
            gradientColors = ['#1a1a1a', '#1e272e', '#2d3436'];
        }
    } else {
        // Light theme gradients
        if (hour >= 5 && hour < 8) { // Dawn
            gradientColors = ['#ff9966', '#ff5e62', '#f0f2f5'];
        } else if (hour >= 8 && hour < 12) { // Morning
            gradientColors = ['#4facfe', '#00f2fe', '#f0f2f5'];
        } else if (hour >= 12 && hour < 16) { // Afternoon
            gradientColors = ['#0095f6', '#00d4ff', '#f0f2f5'];
        } else if (hour >= 16 && hour < 19) { // Evening
            gradientColors = ['#ff9a9e', '#fad0c4', '#f0f2f5'];
        } else { // Night
            gradientColors = ['#a18cd1', '#fbc2eb', '#f0f2f5'];
        }
    }

    // Create gradient string
    const gradient = `linear-gradient(
        135deg,
        ${gradientColors[0]} 0%,
        ${gradientColors[1]} 50%,
        ${gradientColors[2]} 100%
    )`;

    body.style.background = gradient;
}

// Update gradient every minute
setInterval(updateGradient, 60000);

// Update gradient immediately when theme changes
toggleSwitch.addEventListener('change', () => {
    switchTheme(event);
    updateGradient();
});

// Initial gradient update
document.addEventListener('DOMContentLoaded', () => {
    updateGradient();
    generatePrompt();
});