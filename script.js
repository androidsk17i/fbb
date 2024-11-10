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
    "string micro bikini", "high-cut Brazilian bikini", "strappy wrap-around bikini",
    "metallic triangle bikini", "cheeky thong bikini", "cut-out monokini",
    "halter neck bikini", "bandeau bikini set", "crisscross bikini",
    "tie-side bikini", "plunging v-neck bikini", "mesh panel bikini",
    "chain detail bikini", "ruched scrunch bikini", "minimal coverage bikini",
    "adjustable string bikini", "peek-a-boo bikini", "double strap bikini",
    "revealing g-string bikini", "side-tie micro bikini"
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

const gradientThemes = {
    light: [
        ['#ff9966', '#ff5e62', '#f0f2f5'],    // Warm Sunrise
        ['#4facfe', '#00f2fe', '#f0f2f5'],    // Ocean Blue
        ['#0095f6', '#00d4ff', '#f0f2f5'],    // Sky Blue
        ['#ff9a9e', '#fad0c4', '#f0f2f5'],    // Soft Peach
        ['#a18cd1', '#fbc2eb', '#f0f2f5'],    // Lavender
        ['#84fab0', '#8fd3f4', '#f0f2f5'],    // Mint
        ['#fad0c4', '#ffd1ff', '#f0f2f5'],    // Pink Cloud
        ['#ffecd2', '#fcb69f', '#f0f2f5']     // Sunset
    ],
    dark: [
        ['#1a1a1a', '#2d3436', '#3d3d3d'],    // Midnight
        ['#1a1a1a', '#2c3e50', '#34495e'],    // Deep Ocean
        ['#1a1a1a', '#2d3436', '#2c3e50'],    // Dark Steel
        ['#1a1a1a', '#2c3e50', '#2d3436'],    // Shadow
        ['#1a1a1a', '#1e272e', '#2d3436'],    // Abyss
        ['#1a1a1a', '#292e49', '#2d3436'],    // Night Sky
        ['#1a1a1a', '#434343', '#2d3436'],    // Charcoal
        ['#1a1a1a', '#232526', '#2d3436']     // Dark Matter
    ]
};

let currentGradientIndex = 0;

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
    const theme = document.documentElement.getAttribute('data-theme');
    const gradients = gradientThemes[theme === 'dark' ? 'dark' : 'light'];
    
    // Get current and next gradient colors
    const currentColors = gradients[currentGradientIndex];
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;

    // Create gradient string
    const gradient = `linear-gradient(
        135deg,
        ${currentColors[0]} 0%,
        ${currentColors[1]} 50%,
        ${currentColors[2]} 100%
    )`;

    // Apply gradient with transition
    document.body.style.background = gradient;
}

// Update gradient every 60 seconds
setInterval(updateGradient, 60000);

// Update gradient immediately when theme changes
toggleSwitch.addEventListener('change', () => {
    switchTheme(event);
    currentGradientIndex = 0; // Reset gradient index when theme changes
    updateGradient();
});

// Initial gradient update
document.addEventListener('DOMContentLoaded', () => {
    updateGradient();
    generatePrompt();
    updateVisitorCount();
    
    document.querySelectorAll('.animate-in').forEach((elem, index) => {
        elem.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add this CSS transition to your styles.css
document.body.style.transition = 'background 3s ease-in-out';

// Social Share Functions
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this awesome Prompt Generator!');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Prompt Generator');
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
}

// Visitor Counter
async function updateVisitorCount() {
    try {
        // Get IP address from ipify API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        // Get browser information
        const browserInfo = getBrowserInfo();

        // Update the display
        document.getElementById('visitorCount').textContent = 
            `IP: ${ipAddress} | Browser: ${browserInfo}`;
    } catch (error) {
        console.error('Error fetching IP:', error);
        document.getElementById('visitorCount').textContent = 
            `Browser: ${getBrowserInfo()}`;
    }
}

// Add this new helper function
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName;
    
    if (ua.match(/chrome|chromium|crios/i)) {
        browserName = "Chrome";
    } else if (ua.match(/firefox|fxios/i)) {
        browserName = "Firefox";
    } else if (ua.match(/safari/i)) {
        browserName = "Safari";
    } else if (ua.match(/opr\//i)) {
        browserName = "Opera";
    } else if (ua.match(/edg/i)) {
        browserName = "Edge";
    } else {
        browserName = "Unknown";
    }
    
    return browserName;
}