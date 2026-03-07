// Elementos UI
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const mainContent = document.getElementById('main-content');
const modal = document.getElementById('contact-modal');
const btnContact = document.getElementById('open-contact');
const btnCloseModal = document.querySelector('.close-modal');

// Toggle del Menú Lateral
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Función para cargar secciones
async function cargarSeccion(nombre) {
    const mainContent = document.getElementById('main-content');
    
    try {
        // Determinamos la extensión: si es blog buscamos .php, si no .html
        const extension = (nombre === 'blog') ? 'php' : 'html';
        const ruta = `secciones/${nombre}/index.${extension}`;
        
        const respuesta = await fetch(ruta);
        if (!respuesta.ok) throw new Error("No se pudo cargar la sección");
        
        const html = await respuesta.text();
        mainContent.innerHTML = html; // Insertamos el resultado del PHP aquí
        
        window.scrollTo(0, 0);
    } catch (error) {
        mainContent.innerHTML = "<h2>Error al cargar el contenido</h2>";
    }
}

// Modal de contacto
btnContact.onclick = () => modal.style.display = "flex";
btnCloseModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// Carga inicial
document.addEventListener('DOMContentLoaded', () => cargarSeccion('inicio'));



document.addEventListener('click', (e) => {
    // Si el usuario hace clic en el botón de contacto de la sección inicio
    if (e.target && e.target.id === 'open-contact-inicio') {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.style.display = "flex";
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