<?php
header('Content-Type: application/json');
$conexion = mysqli_connect("localhost", "root", "", "web_personal");

if (!$conexion) {
    echo json_encode(['error' => 'Error de conexión']);
    exit;
}

$accion = $_GET['accion'] ?? '';

switch($accion) {
    case 'listar':
        $res = mysqli_query($conexion, "SELECT id, titulo, fecha FROM blog_posts ORDER BY fecha DESC");
        echo json_encode(mysqli_fetch_all($res, MYSQLI_ASSOC));
        break;

    case 'obtener':
        $id = intval($_GET['id']);
        $res = mysqli_query($conexion, "SELECT * FROM blog_posts WHERE id = $id");
        echo json_encode(mysqli_fetch_assoc($res));
        break;

    case 'guardar':
        $id = intval($_POST['id']);
        $titulo = mysqli_real_escape_string($conexion, $_POST['titulo']);
        $extracto = mysqli_real_escape_string($conexion, $_POST['extracto']);
        $contenido = mysqli_real_escape_string($conexion, $_POST['contenido']);
        $video_path = null;

        // Si se sube un video nuevo
        if (isset($_FILES['video_file']) && $_FILES['video_file']['error'] === 0) {
            $nombre_archivo = time() . "_" . $_FILES['video_file']['name'];
            $ruta_destino = "../../videos/" . $nombre_archivo;
            
            // Crear carpeta si no existe
            if (!is_dir('../../videos/')) mkdir('../../videos/', 0777, true);

            if (move_uploaded_file($_FILES['video_file']['tmp_name'], $ruta_destino)) {
                $video_path = $nombre_archivo;
            }
        }

        if ($id > 0) {
            // Update: Solo actualizamos el video si se subió uno nuevo
            $sql_video = $video_path ? ", video_path='$video_path'" : "";
            $query = "UPDATE blog_posts SET titulo='$titulo', extracto='$extracto', contenido='$contenido' $sql_video WHERE id=$id";
        } else {
            // Insert
            $fecha = date('Y-m-d');
            $query = "INSERT INTO blog_posts (titulo, extracto, contenido, video_path, fecha) VALUES ('$titulo', '$extracto', '$contenido', '$video_path', '$fecha')";
        }
        
        $success = mysqli_query($conexion, $query);
        echo json_encode(['success' => $success]);
        break;

    case 'borrar':
        $id = intval($_GET['id']);
        $success = mysqli_query($conexion, "DELETE FROM blog_posts WHERE id = $id");
        echo json_encode(['success' => $success]);
        break;
}
?>