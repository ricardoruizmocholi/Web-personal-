<?php

$host = "localhost";
$user = "root";
$pass = ""; // En XAMPP por defecto está vacío
$db   = "web_personal"; // El nombre que le pusieras en PHPMyAdmin


$conexion = mysqli_connect("localhost", "root", "", "web_personal");
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$query = "SELECT * FROM blog_posts WHERE id = $id";
$res = mysqli_query($conexion, $query);
$post = mysqli_fetch_assoc($res);

if (!$post) { die("Artículo no encontrado."); }
?>

<div class="post-full-container">
    <button onclick="cargarSeccion('blog')" class="btn-volver">
        <span>←</span> Volver al listado
    </button>
    
    <article class="post-glass-panel">
        <header class="post-header">
            <span class="fecha-badge"><?php echo $post['fecha']; ?></span>
            <h1 class="tech-title" style="-webkit-text-fill-color: var(--azul-oscuro);"><?php echo $post['titulo']; ?></h1>
        </header>

        <?php if (!empty($post['video_path'])): ?>
            <div class="video-container" style="margin: 25px 0; border-radius: 15px; overflow: hidden; background: #000;">
                <video controls style="width: 100%; max-height: 450px; display: block;">
                    <source src="videos/<?php echo $post['video_path']; ?>" type="video/mp4">
                    Tu navegador no soporta el video.
                </video>
            </div>
        <?php endif; ?>
        
        <section class="post-body">
            <?php echo nl2br($post['contenido']); ?>
        </section>
    </article>
</div>