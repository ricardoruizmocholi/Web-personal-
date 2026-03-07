<?php
// Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "web_personal");

// Consulta de las 3 entradas
$query = "SELECT id, titulo, extracto, fecha FROM blog_posts ORDER BY fecha DESC LIMIT 3";
$resultado = mysqli_query($conexion, $query);
?>

<div class="blog-container">
    <h1 class="tech-title">Blog de Desarrollo Web</h1>
    <div class="blog-lista-clasica">
        <?php while($row = mysqli_fetch_assoc($resultado)): ?>
            <article class="entrada-fila">
                <div class="info-meta">
                    <span class="fecha"><?php echo $row['fecha']; ?></span>
                </div>
                <div class="cuerpo-entrada">
                    <h2><?php echo $row['titulo']; ?></h2>
                    <p><?php echo $row['extracto']; ?></p>
                    <a href="post.php?id=<?php echo $row['id']; ?>" class="link-leer">
                        Leer artículo completo →
                    </a>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>