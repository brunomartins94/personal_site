let btnMenu = document.getElementById('btn-menu');
let menu = document.getElementById('menu-mobile');
let overlay = document.getElementById('overlay-menu');
let btnFechar = document.querySelector('.btn-fechar i');

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu');
    overlay.style.display = 'block'; // Ativa o overlay
});

btnFechar.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none'; // Desativa o overlay
});

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu');
    overlay.style.display = 'none'; // Desativa o overlay
});