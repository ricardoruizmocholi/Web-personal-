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
    try {
        const respuesta = await fetch(`secciones/${nombre}/index.html`);
        if (!respuesta.ok) throw new Error("Sección no encontrada");
        const html = await respuesta.text();
        
        mainContent.innerHTML = html;
        
        // Cerrar menú tras click
        sidebar.classList.remove('active');
        window.scrollTo(0, 0);
    } catch (error) {
        mainContent.innerHTML = "<h2>Error al cargar la sección</h2>";
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