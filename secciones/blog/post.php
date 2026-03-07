<?php
$conexion = mysqli_connect("localhost", "root", "", "web_personal");
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$query = "SELECT * FROM blog_posts WHERE id = $id";
$res = mysqli_query($conexion, $query);
$post = mysqli_fetch_assoc($res);

if (!$post) { die("Artículo no encontrado."); }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo $post['titulo']; ?> | Mi Blog</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/blog.css">
</head>
<body class="post-template">
    <main class="post-content">
        <a href="index.html" class="back-btn">← Volver al Portfolio</a>
        <header>
            <h1><?php echo $post['titulo']; ?></h1>
            <span class="date"><?php echo $post['fecha']; ?></span>
        </header>
        <section class="body">
            <?php echo $post['contenido']; ?>
        </section>
    </main>
</body>
</html>