// Audio Player
const audio = document.getElementById('radioStream');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = playPauseBtn.querySelector('.play-icon');
const pauseIcon = playPauseBtn.querySelector('.pause-icon');
const volumeUpBtn = document.getElementById('volumeUp');
const volumeDownBtn = document.getElementById('volumeDown');
const vinylMain = document.querySelector('.vinyl-main');
const playerWrapper = document.querySelector('.player-wrapper');
const playerCard = document.querySelector('.player-card');
const sintonizaBtn = document.getElementById('sintonizaBtn');

let isPlaying = false;
audio.volume = 0.7;

// Función para expandir y contraer el reproductor
function expandAndContract() {
    playerWrapper.classList.add('force-expand');
    setTimeout(() => {
        playerWrapper.classList.remove('force-expand');
    }, 2000);
}

// Función para animación de shake
function shakePlayer() {
    playerCard.classList.add('shake-animation');
    setTimeout(() => {
        playerCard.classList.remove('shake-animation');
    }, 500);
}

// Función para iniciar reproducción
function startPlaying() {
    if (!isPlaying) {
        expandAndContract();
        audio.play().catch(err => {
            console.log('Error al reproducir:', err);
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        vinylMain.classList.add('playing');
        isPlaying = true;
    } else {
        shakePlayer();
    }
}

// Botón "Sintoniza Aquí" del hero
sintonizaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startPlaying();
    document.querySelector('.fixed-player').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Play/Pause
playPauseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        vinylMain.classList.remove('playing');
        isPlaying = false;
    } else {
        startPlaying();
    }
});

// Click en toda la tarjeta para activar
playerCard.addEventListener('click', (e) => {
    if (!e.target.closest('#volumeUp') && !e.target.closest('#volumeDown') && !e.target.closest('#playPauseBtn')) {
        startPlaying();
    }
});

// Volumen +
volumeUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.1, 1);
        volumeUpBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            volumeUpBtn.style.transform = 'scale(1)';
        }, 200);
    }
});

// Volumen -
volumeDownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - 0.1, 0);
        volumeDownBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            volumeDownBtn.style.transform = 'scale(1)';
        }, 200);
    }
});

// Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer para animaciones de scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: dejar de observar después de animar
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clases de animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in-left, .fade-in-right, .scale-up');
    
    animatedElements.forEach(element => {
        animateOnScroll.observe(element);
    });
});
