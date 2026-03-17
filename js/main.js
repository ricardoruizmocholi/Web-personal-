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