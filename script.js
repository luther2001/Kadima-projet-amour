// Configuration spectaculaire
const CONFIG = {
    photos: [
        'images/photo1.jpg', 'images/photo2.jpg', 'images/photo3.jpg',
        'images/photo4.jpg', 'images/photo5.jpg', 'images/photo6.jpg',
        'images/photo7.jpg', 'images/photo8 (2).jpg', 'images/photo9 (2).jpg',
        'images/photo10.jpg', 'images/photo11.jpg', 'images/photo12.jpg',
        'images/photo13.jpg', 'images/photo14.jpg.jpeg', 'images/photo15.jpg'
    ],
    
    messages: [
        "✨ Le premier battement de cœur ✨",
        "💕 Ton sourire qui illumine tout",
        "🌹 Ce regard qui m'a fait fondre",
        "💖 L'instant où tout a basculé",
        "🌟 Un moment de pure magie",
        "💗 Toi, moi, et l'éternité",
        "⭐ Cette étincelle unique",
        "💓 Mon cœur s'emballe encore",
        "🌸 Un souvenir gravé à jamais",
        "💝 L'amour de ma vie",
        "🌺 Notre bulle de bonheur",
        "💘 C'était écrit dans les étoiles",
        "🎀 Mon âme sœur",
        "💞 L'histoire parfaite",
        "💕 Je t'aime pour toujours"
    ],
    
    dates: [
        "15 Janvier 2023", "23 Février 2023", "08 Mars 2023",
        "14 Avril 2023", "19 Mai 2023", "21 Juin 2023",
        "07 Juillet 2023", "12 Août 2023", "03 Septembre 2023",
        "18 Octobre 2023", "25 Novembre 2023", "31 Décembre 2023",
        "14 Février 2024", "20 Mars 2024", "01 Avril 2024"
    ]
};

class SpectacularApp {
    constructor() {
        this.currentStep = 1;
        this.bookPages = [];
        this.currentPage = 0;
        this.bookOpen = false;
        this.animationInProgress = false;
        
        this.photos = this.shuffleArray([...CONFIG.photos]);
        this.messages = this.shuffleArray([...CONFIG.messages]);
        this.dates = this.shuffleArray([...CONFIG.dates]);
        
        this.init();
    }

    init() {
        // Afficher la date du jour
        this.displayTodayDate();
        
        // Cacher le loading après chargement
        setTimeout(() => {
            document.getElementById('loading').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading').style.display = 'none';
            }, 1500);
        }, 2500);

        // Initialiser les événements
        document.getElementById('magicBook').addEventListener('click', () => this.openMagicBook());
        window.addEventListener('resize', () => this.handleResize());

        // Démarrer la première étape
        this.startStep1();
    }

    displayTodayDate() {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('todayDate').textContent = today.toLocaleDateString('fr-FR', options);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    goToStep(step) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step-${step}`).classList.add('active');
        this.currentStep = step;
    }

    // ÉTAPE 1: MATRIX SPECTACULAIRE
    startStep1() {
        const matrixCanvas = document.getElementById('matrixCanvas');
        const sparklesCanvas = document.getElementById('sparklesCanvas');
        const matrixCtx = matrixCanvas.getContext('2d');
        const sparklesCtx = sparklesCanvas.getContext('2d');
        
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        sparklesCanvas.width = window.innerWidth;
        sparklesCanvas.height = window.innerHeight;

        // Effet Matrix amélioré
        const chars = "❤️💕💖💗💓💘💝💞💟✨⭐🌟💫⚡";
        const fontSize = 25;
        const columns = matrixCanvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -matrixCanvas.height);
        }

        // Particules scintillantes
        const sparkles = [];
        for (let i = 0; i < 50; i++) {
            sparkles.push({
                x: Math.random() * sparklesCanvas.width,
                y: Math.random() * sparklesCanvas.height,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2
            });
        }

        const drawMatrix = () => {
            // Matrix
            matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                matrixCtx.fillStyle = `rgba(255, 105, 180, ${0.3 + Math.random() * 0.5})`;
                matrixCtx.font = `${fontSize}px 'Arial', 'Segoe UI Emoji'`;
                matrixCtx.shadowColor = '#ff69b4';
                matrixCtx.shadowBlur = 20;
                matrixCtx.fillText(char, i * fontSize, drops[i]);

                if (drops[i] > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += fontSize;
            }

            // Particules scintillantes
            sparklesCtx.clearRect(0, 0, sparklesCanvas.width, sparklesCanvas.height);
            sparkles.forEach(s => {
                s.x += s.speedX;
                s.y += s.speedY;

                if (s.x < 0 || s.x > sparklesCanvas.width) s.speedX *= -1;
                if (s.y < 0 || s.y > sparklesCanvas.height) s.speedY *= -1;

                sparklesCtx.beginPath();
                sparklesCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                sparklesCtx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`;
                sparklesCtx.shadowColor = '#ff69b4';
                sparklesCtx.shadowBlur = 15;
                sparklesCtx.fill();
            });

            requestAnimationFrame(drawMatrix);
        };

        drawMatrix();

        // Compte à rebours spectaculaire
        let count = 3;
        const countdownEl = document.getElementById('countdown');

        const countdownInterval = setInterval(() => {
            countdownEl.textContent = count;
            countdownEl.style.transform = 'scale(1.5)';
            setTimeout(() => {
                countdownEl.style.transform = 'scale(1)';
            }, 200);

            count--;

            if (count < 0) {
                clearInterval(countdownInterval);
                this.goToStep(2);
                this.startStep2();
            }
        }, 1000);
    }

    // ÉTAPE 2: PLUIE DE FÉERIE
    startStep2() {
        const canvas = document.getElementById('rainCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const symbols = ['❤️', '💕', '💖', '💗', '💓', '✨', '⭐', '🌟', '💫'];

        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                size: Math.random() * 40 + 20,
                speed: Math.random() * 4 + 2,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                opacity: Math.random() * 0.7 + 0.3,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y += p.speed;
                p.rotation += p.rotationSpeed;

                if (p.y > canvas.height + 100) {
                    p.y = -100;
                    p.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.font = `${p.size}px 'Arial', 'Segoe UI Emoji'`;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.shadowColor = '#ff69b4';
                ctx.shadowBlur = 30;
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();

        setTimeout(() => {
            this.goToStep(3);
            this.prepareMagicBook();
        }, 4500);
    }

    // ÉTAPE 3: LIVRE MAGIQUE
    prepareMagicBook() {
        const pagesContainer = document.getElementById('magicPages');
        pagesContainer.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const page = document.createElement('div');
            page.className = 'magic-page';

            const img = document.createElement('img');
            img.src = photo;
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'page-caption';
            caption.textContent = this.messages[index] || 'Moment magique';
            
            const date = document.createElement('div');
            date.className = 'page-date';
            date.textContent = this.dates[index] || '';

            page.appendChild(img);
            page.appendChild(caption);
            page.appendChild(date);
            pagesContainer.appendChild(page);
        });

        this.bookPages = document.querySelectorAll('.magic-page');
        this.currentPage = 0;
    }

    openMagicBook() {
        const book = document.getElementById('magicBook');
        
        if (!this.bookOpen && !this.animationInProgress) {
            this.bookOpen = true;
            book.classList.add('open');
            
            // Vibration sur mobile
            if (navigator.vibrate) navigator.vibrate(50);
            
            setTimeout(() => {
                this.showMagicPages();
            }, 1500);
        }
    }

    showMagicPages() {
        if (this.currentPage < this.bookPages.length) {
            this.bookPages[this.currentPage].style.transform = 'rotateY(0deg)';
            this.currentPage++;

            setTimeout(() => {
                this.showMagicPages();
            }, 2000);
        } else {
            setTimeout(() => {
                document.getElementById('magicBook').classList.remove('open');
                
                setTimeout(() => {
                    this.goToStep(4);
                    this.createGiantHeart();
                }, 1500);
            }, 2500);
        }
    }

    // ÉTAPE 4: CŒUR GÉANT SPECTACULAIRE
    createGiantHeart() {
        const container = document.getElementById('giantHeart');
        container.innerHTML = '';

        // Créer les photos avec des tailles variées
        this.photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.className = 'giant-heart-photo';
            
            // Tailles aléatoires pour plus de naturel
            const size = 80 + Math.floor(Math.random() * 60);
            img.style.width = size + 'px';
            img.style.height = size + 'px';
            
            // Positions initiales aléatoires
            img.style.left = Math.random() * (window.innerWidth - size) + 'px';
            img.style.top = Math.random() * (window.innerHeight - size) + 'px';
            img.style.transform = `rotate(${Math.random() * 360}deg) scale(0.5)`;
            img.style.opacity = '0';
            
            container.appendChild(img);

            // Apparition progressive
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
            }, index * 30);
        });

        // Former le cœur géant
        setTimeout(() => {
            const photos = document.querySelectorAll('.giant-heart-photo');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const scale = Math.min(window.innerWidth, window.innerHeight) / 40;

            photos.forEach((photo, i) => {
                const t = (i / photos.length) * Math.PI * 2;
                
                // Équation du cœur parfaite
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
                
                // Ajout d'un léger offset pour l'effet "vivant"
                const offsetX = (Math.random() - 0.5) * 10;
                const offsetY = (Math.random() - 0.5) * 10;
                
                photo.style.left = (centerX + x * scale + offsetX) + 'px';
                photo.style.top = (centerY - y * scale * 0.9 + offsetY) + 'px';
                photo.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(1)`;
                
                // Effet de vague
                photo.style.transitionDelay = (i * 0.02) + 's';
            });
        }, 800);
    }

    handleResize() {
        if (this.currentStep === 4) {
            this.createGiantHeart();
        }
    }
}

// Lancement
document.addEventListener('DOMContentLoaded', () => {
    new SpectacularApp();
});