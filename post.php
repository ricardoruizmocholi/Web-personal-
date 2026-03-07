<?php

$host = "localhost";
$user = "root";
$pass = ""; // En XAMPP por defecto está vacío
$db   = "web_personal"; // El nombre que le pusieras en PHPMyAdmin

$conexion = mysqli_connect("localhost", "root", "", "web_personal");
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$isAjax = isset($_GET['ajax']); // Detectamos si viene de la función JS

$query = "SELECT * FROM blog_posts WHERE id = $id";
$res = mysqli_query($conexion, $query);
$post = mysqli_fetch_assoc($res);

if (!$post) { die("Artículo no encontrado."); }

// SI ES AJAX: Solo devolvemos el contenido (el "trozo" de HTML)
if ($isAjax) { ?>
    <article class="post-content card-glass" style="margin: 20px auto; max-width: 800px;">
        <button onclick="cargarSeccion('blog')" class="btn-glass" style="margin-bottom:20px; cursor:pointer;">
            <span>←</span> Volver al Blog
        </button>
        <header class="post-header">
            <span class="fecha-badge"><?php echo $post['fecha']; ?></span>
            <h1 class="tech-title"><?php echo $post['titulo']; ?></h1>
        </header>
        <section class="post-body" style="color: #333; line-height: 1.8;">
            <?php echo nl2br($post['contenido']); ?>
        </section>
    </article>
<?php 
    exit; // Detenemos la ejecución aquí para no mandar el resto del HTML
} 

// SI NO ES AJAX (Acceso directo por URL): Mantenemos la estructura completa por seguridad
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/blog.css">
    <title><?php echo $post['titulo']; ?></title>
</head>
<body class="post-template">
    <script>window.location.href = "index.html";</script> 
</body>
</html>