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

// Java Script Blog crud

// --- LÓGICA DEL CRUD DEL BLOG ---

async function cargarPostsCRUD() {
    const tabla = document.getElementById('tabla-posts');
    if(!tabla) return;

    try {
        const res = await fetch('secciones/blog/crud.php?accion=listar');
        const posts = await res.json();
        
        tabla.innerHTML = posts.map(p => `
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                <td style="padding: 12px; font-weight: bold;">${p.titulo}</td>
                <td style="padding: 12px;">${p.fecha}</td>
                <td style="padding: 12px; text-align: center;">
                    <button onclick="editarPost(${p.id})" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">📝</button>
                    <button onclick="borrarPost(${p.id})" style="background:none; border:none; cursor:pointer; font-size:1.2rem;">🗑️</button>
                </td>
            </tr>
        `).join('');
    } catch (e) { console.error("Error cargando tabla:", e); }
}

function abrirModalCrear() {
    document.getElementById('form-blog').reset();
    document.getElementById('post-id').value = '';
    document.getElementById('modal-titulo').innerText = 'Nueva Publicación';
    document.getElementById('modal-crud').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal-crud').style.display = 'none';
}

async function editarPost(id) {
    const res = await fetch(`secciones/blog/crud.php?accion=obtener&id=${id}`);
    const p = await res.json();
    
    document.getElementById('post-id').value = p.id;
    document.getElementById('titulo').value = p.titulo;
    document.getElementById('extracto').value = p.extracto;
    document.getElementById('contenido').value = p.contenido;
    
    document.getElementById('modal-titulo').innerText = 'Editar Publicación';
    document.getElementById('modal-crud').style.display = 'flex';
}

async function borrarPost(id) {
    if(confirm('¿Deseas eliminar permanentemente esta publicación?')) {
        await fetch(`secciones/blog/crud.php?accion=borrar&id=${id}`);
        cargarPostsCRUD();
    }
}

// Manejador del formulario (Subida con archivos)
document.addEventListener('submit', async (e) => {
    if(e.target.id === 'form-blog') {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('id', document.getElementById('post-id').value);
        formData.append('titulo', document.getElementById('titulo').value);
        formData.append('extracto', document.getElementById('extracto').value);
        formData.append('contenido', document.getElementById('contenido').value);
        
        const videoInput = document.getElementById('video_file');
        if (videoInput.files[0]) {
            formData.append('video_file', videoInput.files[0]);
        }

        await fetch('secciones/blog/crud.php?accion=guardar', {
            method: 'POST',
            body: formData
        });

        cerrarModal();
        cargarPostsCRUD();
    }
});

// Modifica tu función cargarSeccion para inicializar el CRUD
// Añade esto dentro del 'try' de cargarSeccion(nombre):
// if(nombre === 'blog/crud') setTimeout(cargarPostsCRUD, 100);