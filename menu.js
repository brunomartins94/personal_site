let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let btnFechar = document.querySelector('.btn-fechar i');
let linksMenuMobile = document.querySelectorAll('.menu-mobile a');

function fecharMenu() {
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none';
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