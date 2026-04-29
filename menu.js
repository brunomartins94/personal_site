let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let btnFechar = document.querySelector('.btn-fechar i');
let linksMenuMobile = document.querySelectorAll('.menu-mobile a');
let themeToggle = document.getElementById('theme-toggle');
let themeToggleMobile = document.getElementById('theme-toggle-mobile');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

document.body.setAttribute('data-theme', initialTheme);
updateThemeButtons(initialTheme);

function fecharMenu() {
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none';
}

function updateThemeButtons(theme) {
    const isDark = theme === 'dark';
    const buttons = [themeToggle, themeToggleMobile].filter(Boolean);

    buttons.forEach((button) => {
        const icon = button.querySelector('i');
        if (!icon) return;
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
}

function toggleTheme() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = current === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeButtons(nextTheme);
}

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu');
    overlay.style.display = 'block';
});

btnFechar.addEventListener('click', ()=>{
    fecharMenu();
});

overlay.addEventListener('click', ()=>{
    fecharMenu();
});

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
        toggleTheme();
        fecharMenu();
    });
}

linksMenuMobile.forEach((link) => {
    link.addEventListener('click', () => {
        fecharMenu();
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharMenu();
    }
});