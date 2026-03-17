<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'libs/phpmailer/Exception.php';
require 'libs/phpmailer/PHPMailer.php';
require 'libs/phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // Configuración del Servidor
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Servidor de Gmail
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ricardoruizm99@gmail.com'; // Tu correo
        $mail->Password   = 'acqu mnfq gfxc bngd'; // Contraseña de aplicación de Google
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Destinatarios
        $mail->setFrom($_POST['email'], $_POST['nombre']);
        $mail->addAddress('ricardoruizm99@gmail.com'); // Donde recibirás los mensajes

        // Contenido del mensaje
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo contacto: ' . $_POST['sujet'];
        $mail->Body    = "
            <h3>Has recibido un nuevo mensaje</h3>
            <p><b>Nombre:</b> {$_POST['nombre']} {$_POST['apellido']}</p>
            <p><b>Email:</b> {$_POST['email']}</p>
            <p><b>Teléfono:</b> {$_POST['telefono']}</p>
            <p><b>Mensaje:</b><br>{$_POST['mensaje']}</p>
        ";

        $mail->send();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "details" => $mail->ErrorInfo]);
    }
}