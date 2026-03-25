-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2026 a las 01:01:20
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `web_personal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `extracto` text NOT NULL,
  `contenido` text NOT NULL,
  `fecha` date DEFAULT curdate(),
  `imagen` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `titulo`, `extracto`, `contenido`, `fecha`, `imagen`, `video_path`) VALUES
(1, 'Dominando CSS Grid', 'Aprende a maquetar layouts complejos de forma sencilla.', 'El contenido completo sobre CSS Grid va aquí...', '2026-03-07', 'grid.jpg', NULL),
(4, 'Tablero Dinámico', 'Un pequeño proyecto de carácter utilitario para simplificar la organización', 'De la Necesidad a la Solución Fullstack: Mi nuevo Dashboard de Gestión Visual\r\n¿Demasiadas ideas y poco orden? He construido mi propia solución técnica para organizar proyectos sin distracciones. Es un gestor de tableros dinámicos diseñado para la rapidez, el control total de los datos y la eficiencia visual.\r\nLo que hace especial a este proyecto:\r\nGestión Multitablero: Permite crear y organizar diferentes espacios de trabajo con persistencia de datos.\r\nInterfaz Interactiva: Sistema de Drag & Drop nativo para reordenar tarjetas y priorizar tareas en tiempo real.\r\nPersonalización Total: Control de dimensiones (filas/columnas) y colores mediante un diseño moderno basado en Glassmorphism.\r\nEl Stack Tecnológico:\r\nFrontend: HTML5, CSS3 y Vanilla JavaScript para una manipulación del DOM fluida y sin dependencias.\r\nBackend (API): Arquitectura en PHP que gestiona la lógica de usuario y seguridad.\r\nBase de Datos: SQLite con PDO para un almacenamiento ligero y eficiente.\r\nSeguridad: Autenticación con cifrado password_hash y sesiones persistentes.\r\nEste proyecto nace como un reto personal para demostrar cómo una arquitectura Fullstack puede ser limpia y altamente funcional.\r\n¿Quieres probarlo o revisar el código? He liberado el proyecto bajo licencia GNU GPL v3.0. Puedes verlo, clonarlo o descargarlo aquí: 👉 https://lnkd.in/ehKSYpxj\r\n¿Qué te parece este enfoque para una herramienta de productividad? ¡Te leo en los comentarios! ', '2026-03-24', NULL, '1774352614_2026-03-18 10-22-52.mp4'),
(5, 'Diagrama de Gantt', 'Un pequeño proyecto para la organización de tareas en el tiempo', 'De la Necesidad a la Solución Fullstack: Mi nuevo Dashboard de Gestión Visual\r\n¿Demasiadas ideas y poco orden? He construido mi propia solución técnica para organizar proyectos sin distracciones. Es un gestor de tableros dinámicos diseñado para la rapidez, el control total de los datos y la eficiencia visual.\r\nLo que hace especial a este proyecto:\r\nGestión Multitablero: Permite crear y organizar diferentes espacios de trabajo con persistencia de datos.\r\nInterfaz Interactiva: Sistema de Drag & Drop nativo para reordenar tarjetas y priorizar tareas en tiempo real.\r\nPersonalización Total: Control de dimensiones (filas/columnas) y colores mediante un diseño moderno basado en Glassmorphism.\r\nEl Stack Tecnológico:\r\nFrontend: HTML5, CSS3 y Vanilla JavaScript para una manipulación del DOM fluida y sin dependencias.\r\nBackend (API): Arquitectura en PHP que gestiona la lógica de usuario y seguridad.\r\nBase de Datos: SQLite con PDO para un almacenamiento ligero y eficiente.\r\nSeguridad: Autenticación con cifrado password_hash y sesiones persistentes.\r\nEste proyecto nace como un reto personal para demostrar cómo una arquitectura Fullstack puede ser limpia y altamente funcional.\r\n¿Quieres probarlo o revisar el código? He liberado el proyecto bajo licencia GNU GPL v3.0. Puedes verlo, clonarlo o descargarlo aquí: 👉 https://lnkd.in/ehKSYpxj\r\n¿Qué te parece este enfoque para una herramienta de productividad? ', '2026-03-24', NULL, '1774354617_2026-03-24 13-08-37.mp4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
