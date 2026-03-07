<?php
$host = "localhost";
$user = "root";
$pass = ""; // En XAMPP por defecto está vacío
$db   = "web_personal"; // El nombre que le pusieras en PHPMyAdmin

// Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "web_personal");

// Consulta de las 3 entradas
$query = "SELECT id, titulo, extracto, fecha FROM blog_posts ORDER BY fecha DESC LIMIT 3";
$resultado = mysqli_query($conexion, $query);
?>
<head>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/blog.css">
</head>

<div class="blog-container">
    <h1 class="tech-title">Blog de Desarrollo</h1>
    <div class="blog-grid-glass">
        <?php while($row = mysqli_fetch_assoc($resultado)): ?>
            <article class="card-glass">
                <div class="card-content">
                    <span class="fecha-badge"><?php echo $row['fecha']; ?></span>
                    <h2><?php echo $row['titulo']; ?></h2>
                    <p><?php echo $row['extracto']; ?></p>
                    <a href="#" onclick="verPostCompleto(<?php echo $row['id']; ?>)" class="btn-glass">
                        Leer artículo <span>→</span>
                    </a>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</div>