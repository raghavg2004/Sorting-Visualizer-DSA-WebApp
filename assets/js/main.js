// Theme Management
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Initialize the appropriate page components
    if (document.querySelector('.visualizer-container')) {
        import('./visualizer.js').then(module => {
            module.initVisualizer();
        });
    }
    
    if (document.querySelector('.algorithms-container')) {
        import('./sorting-algorithms.js').then(module => {
            module.initAlgorithmViewer();
        });
    }
    
    if (document.querySelector('.network-container')) {
        import('./network-flow.js').then(module => {
            module.initNetworkFlow();
        });
    }
});