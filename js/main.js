// Detección de protocolo file:// (no compatible con fetch ni PHP)
if (window.location.protocol === 'file:') {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.innerHTML = `
            <div style="font-family:sans-serif;text-align:center;padding:80px 20px;color:#222;">
                <h1 style="color:#e74c3c;font-size:2rem;margin-bottom:16px;">Error: protocolo incorrecto</h1>
                <p style="font-size:1.1rem;line-height:1.6;margin-bottom:24px;">
                    Estás abriendo el archivo directamente desde el disco (<code>file://</code>).<br>
                    Esta web requiere un servidor HTTP para cargar secciones y enviar formularios.
                </p>
                <a href="http://localhost/web-personal/"
                   style="display:inline-block;padding:12px 28px;background:#2980b9;color:#fff;border-radius:6px;text-decoration:none;font-size:1rem;font-weight:bold;">
                    Abrir en http://localhost/web-personal/
                </a>
            </div>`;
    });
    throw new Error('Abre la web en http://localhost/web-personal/ en lugar de file://');
}

// Elementos UI
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const mainContent = document.getElementById('main-content');
const modal = document.getElementById('contact-modal');
const btnContact = document.getElementById('open-contact');
const btnCloseModal = document.querySelector('.close-modal');
const form = document.getElementById('contact-form');

// Carga inicial
document.addEventListener('DOMContentLoaded', () => cargarSeccion('inicio'));

// Toggle del Menú Lateral
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('blur-effect');
});



// Función para cargar secciones
async function cargarSeccion(nombre) {
    const mainContent = document.getElementById('main-content');
    
    try {
        // Determinamos la extensión: si es blog buscamos .php, si no .html
        const extension = (nombre === 'blog') ? 'php' : 'html';
        const ruta = `secciones/${nombre}/index.${extension}`;
        console.log("Intentando cargar:", ruta);
        
        const respuesta = await fetch(ruta);
        console.log("Estado de la respuesta:", respuesta.status);
        if (!respuesta.ok) throw new Error("No se pudo cargar la sección");
        
        const html = await respuesta.text();

        console.log("Contenido recibido (primeros 50 caracteres):", html.substring(0, 50));

        mainContent.innerHTML = html; // Insertamos el resultado del PHP aquí
        
        window.scrollTo(0, 0);
    } catch (error) {
        mainContent.innerHTML = "<h2>Error al cargar el contenido</h2>";
    }
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
    
    if (mainContent.classList.contains('blur-effect')) {
        mainContent.classList.remove('blur-effect');
    }
}

// Modal de contacto
btnContact.onclick = () => modal.style.display = "flex";

btnCloseModal.onclick = () => {
    modal.style.display = "none";
    mainContent.classList.remove('blur-effect');
};
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }




document.addEventListener('click', (e) => {
    // Si el usuario hace clic en el botón de contacto de la sección inicio
    if (e.target && e.target.id === 'open-contact-inicio') {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.style.display = "flex";
        }
    }
});

// Enviar al correo

// Manejo del envío del formulario de contacto
document.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'contact-form') {
        e.preventDefault();

        const form = e.target;
        const btnEnviar = form.querySelector('.btn-enviar');

        // --- VALIDACIÓN REGEX ---
        const email = form.email.value.trim();
        const telefono = form.telefono.value.trim();

        // Regex para Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Regex para Teléfono (General: admite +, espacios y de 9 a 15 números)
        const telRegex = /^\+?[\d\s]{9,15}$/;

        if (!emailRegex.test(email)) {
            alert("Por favor, introduce un correo electrónico válido (ejemplo@dominio.com).");
            form.email.focus();
            return;
        }

        if (telefono !== "" && !telRegex.test(telefono)) {
            alert("El formato del teléfono no es válido.");
            form.telefono.focus();
            return;
        }
        // --- FIN VALIDACIÓN ---

        const formData = new FormData(form);
        btnEnviar.innerText = "Enviando...";
        btnEnviar.disabled = true;

        try {
            const response = await fetch('enviar.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert("¡Mensaje enviado con éxito!");
                form.reset();
                document.getElementById('contact-modal').style.display = "none";
            } else {
                alert("Error: " + result.details);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un fallo en la conexión.");
        } finally {
            btnEnviar.innerText = "Enviar";
            btnEnviar.disabled = false;
        }
    }
});

// Función para cargar un post específico dentro del index.html
async function verPostCompleto(id) {
    const mainContent = document.getElementById('main-content');
    
    try {
        // Llamamos al archivo post.php pero le pedimos solo el contenido, no el HTML completo
        const respuesta = await fetch(`post.php?id=${id}&ajax=true`);
        if (!respuesta.ok) throw new Error("No se pudo cargar el artículo");
        
        const html = await respuesta.text();
        mainContent.innerHTML = html;
        
        window.scrollTo(0, 0); // Volver arriba al cargar el post
    } catch (error) {
        console.error(error);
        mainContent.innerHTML = "<p>Error al cargar el artículo.</p>";
    }
}

//Flechas de navegación

// --- LÓGICA PARA CARRUSEL 3D (Sección Inicio) ---
let currentTheta = 0;

document.addEventListener('click', (e) => {
    const carousel = document.getElementById('carousel-3d');
    if (!carousel) return;

    const panelCount = 4;
    const angle = 360 / panelCount;

    // Buscamos si el clic fue en el botón o dentro de él
    const btnNext = e.target.closest('#nextBtn3d');
    const btnPrev = e.target.closest('#prevBtn3d');

    if (btnNext) {
        currentTheta -= angle;
        // Mantenemos el translateZ(-400px) para que rote en círculo alejado
        carousel.style.transform = `translateZ(-400px) rotateY(${currentTheta}deg)`;
    }
    
    if (btnPrev) {
        currentTheta += angle;
        carousel.style.transform = `translateZ(-400px) rotateY(${currentTheta}deg)`;
    }
});

// Funcionamiento modo oscuro
function configurarModoOscuro() {
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('dark-mode-toggle');
    
    // Estilo para situarlo correctamente
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px', 
        zIndex: '1000',
        padding: '10px',
        width: '45px',
        height: '45px',
        fontSize: '20px',
        borderRadius: '50%',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'var(--fondo-modulo)', // Usamos tu azul para que resalte
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });

    // Función para cambiar el icono
    // Si es modo oscuro -> muestra Sol (para volver al día)
    // Si es modo claro -> muestra Luna (para ir a la noche)
    const actualizarIcono = () => {
        const esOscuro = document.body.classList.contains('dark-mode');
        toggleBtn.innerHTML = esOscuro ? '🌕' : '☀️';
    };

    document.body.appendChild(toggleBtn);

    // 1. Revisar estado inicial al cargar la página
    if (localStorage.getItem('modo-oscuro') === 'true') {
        document.body.classList.add('dark-mode');
    }
    actualizarIcono(); // Poner el icono correcto según la carga inicial

    // 2. Evento de clic
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const esOscuroNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('modo-oscuro', esOscuroNow);
        
        actualizarIcono(); // Cambiar el icono tras el clic
    });
}

document.addEventListener('DOMContentLoaded', configurarModoOscuro);

// --- EASTER EGG: PONG MINIMALISTA ---

let secretCode = '';
const codigoSecreto = 'pong';

// 1. Activar por teclado
document.addEventListener('keydown', (e) => {
    secretCode += e.key.toLowerCase();
    
    if (secretCode.length > codigoSecreto.length) {
        secretCode = secretCode.substring(secretCode.length - codigoSecreto.length);
    }
    
    if (secretCode === codigoSecreto) {
        activarJuegoDesdeFuera();
        secretCode = ''; 
    }
});

// 2. Crear y activar por el Píxel Anómalo (Botón secreto)
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !document.getElementById('secret-pong-btn')) {
        const secretBtn = document.createElement('div');
        secretBtn.id = 'secret-pong-btn';
        secretBtn.title = "¿Curiosidad?";
        
        sidebar.appendChild(secretBtn);

        secretBtn.addEventListener('click', activarJuegoDesdeFuera);
    }
});

// Función de control para no abrirlo dos veces
function activarJuegoDesdeFuera() {
    if (!document.getElementById('pong-canvas')?.classList.contains('activo')) {
        iniciarPong();
    }
}

function iniciarPong() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // --- CREACIÓN DE ELEMENTOS (CANVAS Y UIs) ---
    let canvas = document.getElementById('pong-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'pong-canvas';
        sidebar.appendChild(canvas);
    }

    // Función para crear las pantallas de UI (Victoria/Derrota)
    function crearPantallaUI(id, titulo, colorTitulo, colorBtn) {
        let ui = document.getElementById(id);
        if (!ui) {
            ui = document.createElement('div');
            ui.id = id;
            ui.innerHTML = `
                <h3 style="font-size: 1.8rem; margin-bottom: 30px; color: ${colorTitulo}; text-transform: uppercase; letter-spacing: 2px; text-align: center;">${titulo}</h3>
                <div style="display: flex; gap: 20px;">
                    <button class="btn-pong-repetir" style="background: ${colorBtn}; border: none; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.5); transition: transform 0.2s;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: white;"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                    </button>
                    <button class="btn-pong-cerrar" style="background: #ff3366; border: none; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.5); transition: transform 0.2s;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: white;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
            `;
            ui.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:none; flex-direction:column; justify-content:center; align-items:center; z-index:60;";
            sidebar.appendChild(ui);
        }
        return ui;
    }

    const lossUI = crearPantallaUI('pong-game-over', '¡Has perdido!', 'white', 'var(--azul-gradiente, #0033FF)');
    const winUI = crearPantallaUI('pong-win', '¡VICTORIA!', '#FFD700', '#FFD700'); // Dorado para la victoria

    canvas.width = sidebar.offsetWidth;
    canvas.height = sidebar.offsetHeight;
    canvas.classList.add('activo');

    const ctx = canvas.getContext('2d');
    let score = 0;
    let playing = true;
    let animationId;
    let ball = { x: 50, y: 50, r: 8, dx: 4, dy: 4 };
    const paddle = { w: 10, h: 80, x: 10, y: canvas.height / 2 - 40 };

    const movePaddle = (e) => {
        const rect = canvas.getBoundingClientRect();
        paddle.y = e.clientY - rect.top - paddle.h / 2;
    };
    canvas.addEventListener('mousemove', movePaddle);

    // --- LÓGICA DE BOTONES ---
    const resetGame = () => {
        score = 0;
        ball = { x: 50, y: 50, r: 8, dx: 4, dy: 4 };
        lossUI.style.display = 'none';
        winUI.style.display = 'none';
        sidebar.classList.remove('victoria-pong'); // Quitar dorado si estaba
        playing = true;
        draw();
    };

    const closeGame = () => {
        playing = false;
        lossUI.style.display = 'none';
        winUI.style.display = 'none';
        canvas.classList.remove('activo');
        sidebar.classList.remove('victoria-pong');
        canvas.removeEventListener('mousemove', movePaddle);
        cancelAnimationFrame(animationId);
    };

    // Asignar eventos a ambos juegos de botones
    [lossUI, winUI].forEach(ui => {
        ui.querySelector('.btn-pong-repetir').onclick = resetGame;
        ui.querySelector('.btn-pong-cerrar').onclick = closeGame;
    });

    function draw() {
        if (!playing) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar elementos
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = (score >= 10) ? '#FFD700' : 'var(--azul-gradiente, #0033FF)';
        ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = 'bold 80px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(score, canvas.width / 2, canvas.height / 2 + 30);

        // Movimiento y Colisiones
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.dy *= -1;
        if (ball.x + ball.r > canvas.width) ball.dx *= -1;

        if (ball.x - ball.r < paddle.x + paddle.w) {
            if (ball.y > paddle.y && ball.y < paddle.y + paddle.h) {
                ball.dx *= -1;
                ball.dx += 0.5; 
                score++;
                if (score >= 15) {
                    ganarJuego();
                    return;
                }
            } else if (ball.x < 0) {
                perderJuego();
                return;
            }
        }
        animationId = requestAnimationFrame(draw);
    }

    function ganarJuego() {
        playing = false;
        sidebar.classList.add('victoria-pong'); // Activa el CSS dorado
        winUI.style.display = 'flex';
    }

    function perderJuego() {
        playing = false;
        lossUI.style.display = 'flex';
    }

    draw();
}