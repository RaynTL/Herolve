-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2014 a las 21:16:29
-- Versión del servidor: 5.6.16
-- Versión de PHP: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `herolve`
--
DROP DATABASE IF EXISTS `herolve`;
CREATE DATABASE IF NOT EXISTS `herolve` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `herolve`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

DROP TABLE IF EXISTS `amigos`;
CREATE TABLE IF NOT EXISTS `amigos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user1` (`id_user1`,`id_user2`),
  KEY `id_user2` (`id_user2`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`id`, `id_user1`, `id_user2`, `estado`) VALUES
(7, 10, 9, 'a'),
(8, 11, 9, 'b'),
(9, 12, 11, 'a'),
(10, 12, 9, 'a'),
(11, 13, 9, 'a'),
(12, 13, 11, 'a'),
(13, 13, 12, 'a'),
(14, 14, 9, 'a'),
(15, 14, 11, 'a'),
(16, 14, 12, 'a'),
(17, 14, 13, 'a'),
(18, 10, 11, 'a'),
(19, 10, 12, 'a'),
(20, 10, 13, 'b'),
(21, 10, 14, 'a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigospendiente`
--

DROP TABLE IF EXISTS `amigospendiente`;
CREATE TABLE IF NOT EXISTS `amigospendiente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser1` int(11) NOT NULL,
  `idUser2` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser1` (`idUser1`,`idUser2`),
  KEY `idUser2` (`idUser2`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `block`
--

DROP TABLE IF EXISTS `block`;
CREATE TABLE IF NOT EXISTS `block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_blokeador` int(11) NOT NULL,
  `id_blokeado` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_blokeador` (`id_blokeador`,`id_blokeado`),
  KEY `id_blokeado` (`id_blokeado`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `block`
--

INSERT INTO `block` (`id`, `id_blokeador`, `id_blokeado`) VALUES
(1, 9, 11),
(3, 10, 13),
(2, 11, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_amigos` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `mensaje` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_amigos` (`id_amigos`,`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificios`
--

DROP TABLE IF EXISTS `edificios`;
CREATE TABLE IF NOT EXISTS `edificios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clase_edificio` varchar(20) NOT NULL,
  `clase_recurso` varchar(20) NOT NULL,
  `valormadera` int(11) NOT NULL,
  `valorpiedra` int(11) NOT NULL,
  `valormetal` int(11) NOT NULL,
  `valorcomida` int(11) NOT NULL,
  `valorrubies` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `exponente` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clase_edificio` (`clase_edificio`,`clase_recurso`),
  KEY `clase_recurso` (`clase_recurso`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `edificios`
--

INSERT INTO `edificios` (`id`, `clase_edificio`, `clase_recurso`, `valormadera`, `valorpiedra`, `valormetal`, `valorcomida`, `valorrubies`, `descripcion`, `nombre`, `cantidad`, `exponente`) VALUES
(1, 'aserradero', 'madera', 10, 10, 0, 5, 0, 'Instalación artesanal dedicada al aserrado de madera.', 'Aserradero', 1, 1),
(2, 'casa', 'comida', 10, 5, 0, 10, 0, 'El lugar a donde irás a descansar después de una dura misión.', 'Casa', 1, 1),
(3, 'cuartel', 'soldados', 100, 100, 150, 100, 0, '¿Quieres ser un gran comandante? Mejora tu cuartel.', 'Cuartel', 1, 0.6),
(4, 'escuelamagia', 'magos', 150, 50, 50, 100, 200, 'Dicen que la magia es el arte de los locos. ¡Locos los que no se atreven a manipularla!', 'Escuela de magia', 1, 0.3),
(5, 'herreria', 'poder_heroe', 55, 55, 55, 20, 0, '¿Aún te defiendes con tus puños? Pasate por la herrería a comprar una buena espada o maza.', 'Herreria', 0, 1.5),
(6, 'minametal', 'metal', 10, 10, 5, 0, 0, '¿Necesitas metal para armas u otras herramientas?', 'Mina de metales', 1, 2),
(7, 'minapiedra', 'piedra', 10, 5, 0, 5, 0, 'La piedra es un elemento básico para la construcción de edificios resistentes.', 'Mina de piedra', 1, 1),
(8, 'minarubies', 'rubies', 60, 60, 60, 0, 30, 'La piedra filosofal, el eter... Muchos nombres se le han dado a esta piedra de color fuego intenso.', 'Mina de rubíes', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificios_clase`
--

DROP TABLE IF EXISTS `edificios_clase`;
CREATE TABLE IF NOT EXISTS `edificios_clase` (
  `clase` varchar(20) NOT NULL,
  PRIMARY KEY (`clase`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `edificios_clase`
--

INSERT INTO `edificios_clase` (`clase`) VALUES
('aserradero'),
('casa'),
('cuartel'),
('escuelamagia'),
('herreria'),
('minametal'),
('minapiedra'),
('minarubies');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `edificios_heroe`
--

DROP TABLE IF EXISTS `edificios_heroe`;
CREATE TABLE IF NOT EXISTS `edificios_heroe` (
  `id_heroe` int(11) NOT NULL,
  `id_edificio` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `final` datetime DEFAULT NULL,
  `nivel` int(11) NOT NULL,
  PRIMARY KEY (`id_heroe`,`id_edificio`),
  KEY `id_edificio` (`id_edificio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `edificios_heroe`
--

INSERT INTO `edificios_heroe` (`id_heroe`, `id_edificio`, `estado`, `final`, `nivel`) VALUES
(9, 1, 'd', NULL, 1),
(9, 2, 'd', NULL, 1),
(9, 3, 'c', '2014-06-22 21:18:13', 0),
(9, 4, 'd', NULL, 0),
(9, 5, 'd', NULL, 0),
(9, 6, 'd', NULL, 1),
(9, 7, 'd', NULL, 1),
(9, 8, 'd', NULL, 1),
(10, 1, 'd', NULL, 1),
(10, 2, 'd', NULL, 1),
(10, 3, 'c', '2014-06-22 21:16:15', 0),
(10, 4, 'd', NULL, 0),
(10, 5, 'd', NULL, 0),
(10, 6, 'd', NULL, 1),
(10, 7, 'd', NULL, 1),
(10, 8, 'd', NULL, 0),
(11, 1, 'd', NULL, 0),
(11, 2, 'c', '2014-06-22 21:05:39', 0),
(11, 3, 'd', NULL, 0),
(11, 4, 'd', NULL, 0),
(11, 5, 'd', NULL, 0),
(11, 6, 'd', NULL, 0),
(11, 7, 'd', NULL, 0),
(11, 8, 'd', NULL, 0),
(12, 1, 'd', NULL, 0),
(12, 2, 'c', '2014-06-22 21:06:07', 0),
(12, 3, 'd', NULL, 0),
(12, 4, 'd', NULL, 0),
(12, 5, 'd', NULL, 0),
(12, 6, 'd', NULL, 0),
(12, 7, 'd', NULL, 0),
(12, 8, 'd', NULL, 0),
(13, 1, 'd', NULL, 0),
(13, 2, 'd', NULL, 0),
(13, 3, 'd', NULL, 0),
(13, 4, 'd', NULL, 0),
(13, 5, 'd', NULL, 0),
(13, 6, 'c', '2014-06-22 21:06:36', 0),
(13, 7, 'd', NULL, 0),
(13, 8, 'd', NULL, 0),
(14, 1, 'd', NULL, 0),
(14, 2, 'c', '2014-06-22 21:06:48', 0),
(14, 3, 'd', NULL, 0),
(14, 4, 'd', NULL, 0),
(14, 5, 'd', NULL, 0),
(14, 6, 'd', NULL, 0),
(14, 7, 'd', NULL, 1),
(14, 8, 'd', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `heroes`
--

DROP TABLE IF EXISTS `heroes`;
CREATE TABLE IF NOT EXISTS `heroes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `id_mundo` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `experiencia` int(11) NOT NULL,
  `poder` int(11) NOT NULL,
  `last` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_mundo` (`id_mundo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `heroes`
--

INSERT INTO `heroes` (`id`, `id_user`, `nombre`, `id_mundo`, `estado`, `nivel`, `experiencia`, `poder`, `last`) VALUES
(9, 9, 'FireDragon', 1, 0, 2, 0, 1, '2014-06-22 21:16:25'),
(10, 10, 'killerdaddy', 1, 0, 1, 70, 1, '2014-06-22 21:09:02'),
(11, 11, 'diegodalton', 1, 0, 1, 0, 1, '2014-06-22 21:05:22'),
(12, 12, 'mikyishere', 1, 0, 1, 0, 1, '2014-06-22 21:05:50'),
(13, 13, 'lady_ines', 1, 0, 1, 0, 1, '2014-06-22 21:06:13'),
(14, 14, 'luckyluke', 1, 0, 1, 20, 1, '2014-06-22 21:06:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapas`
--

DROP TABLE IF EXISTS `mapas`;
CREATE TABLE IF NOT EXISTS `mapas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_mundo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_mundo` (`id_mundo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `mapas`
--

INSERT INTO `mapas` (`id`, `id_mundo`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mapas_misiones`
--

DROP TABLE IF EXISTS `mapas_misiones`;
CREATE TABLE IF NOT EXISTS `mapas_misiones` (
  `id_mapa` int(11) NOT NULL,
  `id_mision` int(11) NOT NULL,
  `posicion` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  PRIMARY KEY (`id_mapa`,`id_mision`,`posicion`),
  KEY `id_mision` (`id_mision`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mapas_misiones`
--

INSERT INTO `mapas_misiones` (`id_mapa`, `id_mision`, `posicion`, `x`, `y`) VALUES
(1, 5, 1, 4, 6),
(1, 6, 2, 2, 13),
(1, 7, 3, 7, 10),
(1, 8, 4, 10, 10),
(1, 9, 5, 11, 4),
(1, 10, 6, 17, 3),
(1, 11, 7, 18, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misiones`
--

DROP TABLE IF EXISTS `misiones`;
CREATE TABLE IF NOT EXISTS `misiones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(15) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `tiempo` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `poder` int(11) NOT NULL,
  `fallo` int(11) NOT NULL,
  `jugadores` int(11) NOT NULL,
  `rec_comida` int(11) NOT NULL,
  `rec_experiencia` int(11) NOT NULL,
  `rec_madera` int(11) NOT NULL,
  `rec_metal` int(11) NOT NULL,
  `rec_piedra` int(11) NOT NULL,
  `rec_rubies` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `misiones`
--

INSERT INTO `misiones` (`id`, `nombre`, `descripcion`, `tiempo`, `nivel`, `poder`, `fallo`, `jugadores`, `rec_comida`, `rec_experiencia`, `rec_madera`, `rec_metal`, `rec_piedra`, `rec_rubies`) VALUES
(5, 'Bosque', 'El bosque es el primer paso en tu camino. Tras él ', 120, 1, 0, 10, 1, 10, 20, 50, 10, 50, 0),
(6, 'Aldea nevada', 'A lo lejos ves una aldea donde crees que puedes re', 300, 2, 0, 25, 1, 25, 50, 60, 25, 60, 1),
(7, 'Puente mágico', 'Ante ti se presenta un río. Para poder cruzarlo de', 300, 3, 0, 20, 1, 25, 30, 20, 30, 20, 1),
(8, 'Aldea Abandonad', 'Llegas a una aldea y las ruinas te indican que hac', 600, 3, 0, 30, 1, 10, 20, 60, 50, 60, 1),
(9, 'Pantano', 'Debes tener cuidado con este pantano. Algún criatu', 600, 5, 0, 20, 1, 25, 50, 20, 30, 20, 1),
(10, 'Mina', 'Por fin has llegado a un lugar lleno de riqueza. A', 1200, 6, 0, 20, 1, 0, 70, 50, 100, 50, 5),
(11, 'Volcán', 'Los volcanes son peligrosos. Pero de su interior p', 2000, 7, 0, 20, 1, 30, 60, 50, 60, 80, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misiones_heroe`
--

DROP TABLE IF EXISTS `misiones_heroe`;
CREATE TABLE IF NOT EXISTS `misiones_heroe` (
  `id_heroe` int(11) NOT NULL,
  `id_mision` int(11) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `final` datetime DEFAULT NULL,
  PRIMARY KEY (`id_heroe`,`id_mision`),
  KEY `id_mision` (`id_mision`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `misiones_heroe`
--

INSERT INTO `misiones_heroe` (`id_heroe`, `id_mision`, `estado`, `final`) VALUES
(9, 5, 'c', NULL),
(9, 6, 'c', NULL),
(9, 7, 'c', NULL),
(9, 8, 'n', NULL),
(9, 9, 'f', NULL),
(9, 10, 'f', NULL),
(9, 11, 'f', NULL),
(10, 5, 'c', NULL),
(10, 6, 'c', NULL),
(10, 7, 'p', '2014-06-22 21:13:49'),
(10, 8, 'f', NULL),
(10, 9, 'f', NULL),
(10, 10, 'f', NULL),
(10, 11, 'f', NULL),
(11, 5, 'n', NULL),
(11, 6, 'f', NULL),
(11, 7, 'f', NULL),
(11, 8, 'f', NULL),
(11, 9, 'f', NULL),
(11, 10, 'f', NULL),
(11, 11, 'f', NULL),
(12, 5, 'p', '2014-06-22 21:07:47'),
(12, 6, 'f', NULL),
(12, 7, 'f', NULL),
(12, 8, 'f', NULL),
(12, 9, 'f', NULL),
(12, 10, 'f', NULL),
(12, 11, 'f', NULL),
(13, 5, 'p', '2014-06-22 21:08:08'),
(13, 6, 'f', NULL),
(13, 7, 'f', NULL),
(13, 8, 'f', NULL),
(13, 9, 'f', NULL),
(13, 10, 'f', NULL),
(13, 11, 'f', NULL),
(14, 5, 'c', NULL),
(14, 6, 'p', '2014-06-22 21:11:45'),
(14, 7, 'f', NULL),
(14, 8, 'f', NULL),
(14, 9, 'f', NULL),
(14, 10, 'f', NULL),
(14, 11, 'f', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mundos`
--

DROP TABLE IF EXISTS `mundos`;
CREATE TABLE IF NOT EXISTS `mundos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuarios_max` int(11) NOT NULL,
  `usuarios` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `mundos`
--

INSERT INTO `mundos` (`id`, `usuarios_max`, `usuarios`) VALUES
(1, 100, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones_usuario`
--

DROP TABLE IF EXISTS `notificaciones_usuario`;
CREATE TABLE IF NOT EXISTS `notificaciones_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_heroe` int(11) NOT NULL,
  `descripcion` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_heroe`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=101 ;

--
-- Volcado de datos para la tabla `notificaciones_usuario`
--

INSERT INTO `notificaciones_usuario` (`id`, `id_heroe`, `descripcion`, `fecha`) VALUES
(28, 12, 'Te ha solicitado amistad rodri', '2014-06-22 20:46:11'),
(30, 13, 'Te ha solicitado amistad rodri', '2014-06-22 20:46:13'),
(32, 11, 'Te ha solicitado amistad rodri', '2014-06-22 20:46:15'),
(41, 9, 'Has terminado la mision: Bosque', '2014-06-22 20:56:14'),
(43, 9, 'Ya eres amigo de diego', '2014-06-22 21:01:37'),
(44, 11, 'Ya eres amigo de rodri', '2014-06-22 21:01:38'),
(46, 11, 'Has solicitado amistad a david', '2014-06-22 21:01:44'),
(47, 12, 'Te ha solicitado amistad diego', '2014-06-22 21:01:45'),
(48, 11, 'Has solicitado amistad a miky', '2014-06-22 21:01:45'),
(49, 13, 'Te ha solicitado amistad diego', '2014-06-22 21:01:46'),
(50, 11, 'Has solicitado amistad a ines', '2014-06-22 21:01:46'),
(52, 11, 'Has solicitado amistad a rayner', '2014-06-22 21:01:50'),
(53, 11, 'Ya eres amigo de miky', '2014-06-22 21:01:58'),
(54, 12, 'Ya eres amigo de diego', '2014-06-22 21:01:58'),
(55, 9, 'Ya eres amigo de miky', '2014-06-22 21:01:59'),
(56, 12, 'Ya eres amigo de rodri', '2014-06-22 21:01:59'),
(57, 14, 'Te ha solicitado amistad miky', '2014-06-22 21:02:10'),
(58, 12, 'Has solicitado amistad a rayner', '2014-06-22 21:02:10'),
(59, 10, 'Te ha solicitado amistad miky', '2014-06-22 21:02:15'),
(60, 12, 'Has solicitado amistad a david', '2014-06-22 21:02:15'),
(61, 13, 'Te ha solicitado amistad miky', '2014-06-22 21:02:18'),
(62, 12, 'Has solicitado amistad a ines', '2014-06-22 21:02:18'),
(63, 9, 'Ya eres amigo de ines', '2014-06-22 21:02:29'),
(64, 13, 'Ya eres amigo de rodri', '2014-06-22 21:02:29'),
(65, 11, 'Ya eres amigo de ines', '2014-06-22 21:02:30'),
(66, 13, 'Ya eres amigo de diego', '2014-06-22 21:02:30'),
(67, 12, 'Ya eres amigo de ines', '2014-06-22 21:02:31'),
(68, 13, 'Ya eres amigo de miky', '2014-06-22 21:02:31'),
(69, 14, 'Te ha solicitado amistad ines', '2014-06-22 21:02:36'),
(70, 13, 'Has solicitado amistad a rayner', '2014-06-22 21:02:36'),
(71, 10, 'Te ha solicitado amistad ines', '2014-06-22 21:02:40'),
(72, 13, 'Has solicitado amistad a david', '2014-06-22 21:02:40'),
(73, 9, 'Ya eres amigo de rayner', '2014-06-22 21:02:52'),
(74, 14, 'Ya eres amigo de rodri', '2014-06-22 21:02:52'),
(75, 11, 'Ya eres amigo de rayner', '2014-06-22 21:02:53'),
(76, 14, 'Ya eres amigo de diego', '2014-06-22 21:02:53'),
(77, 12, 'Ya eres amigo de rayner', '2014-06-22 21:02:54'),
(78, 14, 'Ya eres amigo de miky', '2014-06-22 21:02:54'),
(79, 13, 'Ya eres amigo de rayner', '2014-06-22 21:02:54'),
(80, 14, 'Ya eres amigo de ines', '2014-06-22 21:02:54'),
(81, 10, 'Te ha solicitado amistad rayner', '2014-06-22 21:02:59'),
(82, 14, 'Has solicitado amistad a david', '2014-06-22 21:02:59'),
(83, 11, 'Ya eres amigo de david', '2014-06-22 21:03:19'),
(84, 10, 'Ya eres amigo de diego', '2014-06-22 21:03:19'),
(85, 12, 'Ya eres amigo de david', '2014-06-22 21:03:20'),
(86, 10, 'Ya eres amigo de miky', '2014-06-22 21:03:20'),
(87, 13, 'Ya eres amigo de david', '2014-06-22 21:03:22'),
(88, 10, 'Ya eres amigo de ines', '2014-06-22 21:03:22'),
(89, 14, 'Ya eres amigo de david', '2014-06-22 21:03:23'),
(90, 10, 'Ya eres amigo de rayner', '2014-06-22 21:03:23'),
(91, 9, 'Has terminado el edificio: Mina de piedra', '2014-06-22 21:03:54'),
(92, 10, 'Has terminado el edificio: Mina de piedra', '2014-06-22 21:03:56'),
(93, 9, 'Has terminado el edificio: Mina de metales', '2014-06-22 21:04:34'),
(94, 14, 'Has terminado la mision: Bosque', '2014-06-22 21:06:23'),
(95, 14, 'Has terminado el edificio: Mina de piedra', '2014-06-22 21:06:23'),
(96, 10, 'Has terminado la mision: Aldea nevada', '2014-06-22 21:08:36'),
(97, 10, 'Has terminado el edificio: Aserradero', '2014-06-22 21:08:37'),
(98, 9, 'Has terminado la mision: Aldea nevada', '2014-06-22 21:09:19'),
(99, 9, 'Has terminado el edificio: Mina de rubíes', '2014-06-22 21:10:29'),
(100, 9, 'Has terminado la mision: Puente mágico', '2014-06-22 21:14:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recursos`
--

DROP TABLE IF EXISTS `recursos`;
CREATE TABLE IF NOT EXISTS `recursos` (
  `id_heroe` int(11) NOT NULL,
  `clase` varchar(15) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_heroe`,`clase`),
  KEY `clase` (`clase`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recursos`
--

INSERT INTO `recursos` (`id_heroe`, `clase`, `cantidad`) VALUES
(9, 'comida', 1242),
(9, 'madera', 1282),
(9, 'magos', 50),
(9, 'metal', 1322),
(9, 'piedra', 741),
(9, 'rubies', 378),
(9, 'soldados', 50),
(10, 'comida', 799),
(10, 'madera', 26),
(10, 'magos', 50),
(10, 'metal', 1538),
(10, 'piedra', 311),
(10, 'rubies', 51),
(10, 'soldados', 50),
(11, 'comida', 40),
(11, 'madera', 40),
(11, 'magos', 50),
(11, 'metal', 50),
(11, 'piedra', 45),
(11, 'rubies', 50),
(11, 'soldados', 50),
(12, 'comida', 40),
(12, 'madera', 40),
(12, 'magos', 50),
(12, 'metal', 50),
(12, 'piedra', 45),
(12, 'rubies', 50),
(12, 'soldados', 50),
(13, 'comida', 50),
(13, 'madera', 40),
(13, 'magos', 50),
(13, 'metal', 45),
(13, 'piedra', 40),
(13, 'rubies', 50),
(13, 'soldados', 50),
(14, 'comida', 45),
(14, 'madera', 80),
(14, 'magos', 50),
(14, 'metal', 60),
(14, 'piedra', 110),
(14, 'rubies', 50),
(14, 'soldados', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recurso_clase`
--

DROP TABLE IF EXISTS `recurso_clase`;
CREATE TABLE IF NOT EXISTS `recurso_clase` (
  `id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recurso_clase`
--

INSERT INTO `recurso_clase` (`id`) VALUES
('comida'),
('madera'),
('magos'),
('metal'),
('piedra'),
('poder_heroe'),
('rubies'),
('soldados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token`
--

DROP TABLE IF EXISTS `token`;
CREATE TABLE IF NOT EXISTS `token` (
  `id` int(11) NOT NULL,
  `token` varchar(64) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `token`
--

INSERT INTO `token` (`id`, `token`) VALUES
(9, '3c3012ed29e416b103e810d5d76a50f437f4408d9731fde4087bf1f7e55e6582');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokenadmin`
--

DROP TABLE IF EXISTS `tokenadmin`;
CREATE TABLE IF NOT EXISTS `tokenadmin` (
  `id` int(11) NOT NULL,
  `token` varchar(64) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(15) NOT NULL,
  `hash` varchar(60) NOT NULL,
  `salt` varchar(10) NOT NULL,
  `correo` varchar(20) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `foto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nick` (`nick`,`correo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nick`, `hash`, `salt`, `correo`, `estado`, `foto`) VALUES
(9, 'rodri', '5b748287b647c681b0604877e5295778f2b3a4cb', 'bbc2df9644', 'rodrigo@herolve.com', 'c', 8),
(10, 'david', '9d299273ae9fcf793a817b14eca4b3f17669f364', 'ebd8826d43', 'david@herolve.com', 'd', 3),
(11, 'diego', '1c0570a74e768c28bb240024f44bb62f8787e13b', '6d3b6dd425', 'diego@herolve.com', 'd', 5),
(12, 'miky', 'b9d5d749dfb2f97ba54f4d5aba4ea0e9ec00a89c', '8bedc968c2', 'miky@herolve.com', 'd', 7),
(13, 'ines', 'd9b8ef3cfa2023e121f079291b5f593a30a534d8', 'd1d17aebb0', 'ines@herolve.com', 'd', 4),
(14, 'rayner', 'f1e259a2c0401e7d7935ff4adcadcd5c346a19ef', 'ae35272c10', 'ray@herolve.com', 'd', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosadmin`
--

DROP TABLE IF EXISTS `usuariosadmin`;
CREATE TABLE IF NOT EXISTS `usuariosadmin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `hash` varchar(60) COLLATE latin1_spanish_ci NOT NULL,
  `salt` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nick` (`nick`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `usuariosadmin`
--

INSERT INTO `usuariosadmin` (`id`, `nick`, `hash`, `salt`) VALUES
(1, 'admin', '5d960e8b7905aa0154ec70617cffe4683355e9a0', 'eb12a4dc30');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_ibfk_1` FOREIGN KEY (`id_user1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigos_ibfk_2` FOREIGN KEY (`id_user2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `amigospendiente`
--
ALTER TABLE `amigospendiente`
  ADD CONSTRAINT `amigospendiente_ibfk_1` FOREIGN KEY (`idUser1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigospendiente_ibfk_2` FOREIGN KEY (`idUser2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `block`
--
ALTER TABLE `block`
  ADD CONSTRAINT `block_ibfk_1` FOREIGN KEY (`id_blokeador`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `block_ibfk_2` FOREIGN KEY (`id_blokeado`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`id_amigos`) REFERENCES `amigos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `edificios`
--
ALTER TABLE `edificios`
  ADD CONSTRAINT `edificios_ibfk_1` FOREIGN KEY (`clase_edificio`) REFERENCES `edificios_clase` (`clase`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `edificios_ibfk_2` FOREIGN KEY (`clase_recurso`) REFERENCES `recurso_clase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `edificios_heroe`
--
ALTER TABLE `edificios_heroe`
  ADD CONSTRAINT `edificios_heroe_ibfk_1` FOREIGN KEY (`id_heroe`) REFERENCES `heroes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `edificios_heroe_ibfk_2` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `heroes`
--
ALTER TABLE `heroes`
  ADD CONSTRAINT `heroes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `heroes_ibfk_2` FOREIGN KEY (`id_mundo`) REFERENCES `mundos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mapas`
--
ALTER TABLE `mapas`
  ADD CONSTRAINT `mapas_ibfk_1` FOREIGN KEY (`id_mundo`) REFERENCES `mundos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mapas_misiones`
--
ALTER TABLE `mapas_misiones`
  ADD CONSTRAINT `mapas_misiones_ibfk_1` FOREIGN KEY (`id_mapa`) REFERENCES `mapas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mapas_misiones_ibfk_2` FOREIGN KEY (`id_mision`) REFERENCES `misiones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `misiones_heroe`
--
ALTER TABLE `misiones_heroe`
  ADD CONSTRAINT `misiones_heroe_ibfk_1` FOREIGN KEY (`id_heroe`) REFERENCES `heroes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `misiones_heroe_ibfk_2` FOREIGN KEY (`id_mision`) REFERENCES `misiones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notificaciones_usuario`
--
ALTER TABLE `notificaciones_usuario`
  ADD CONSTRAINT `notificaciones_usuario_ibfk_1` FOREIGN KEY (`id_heroe`) REFERENCES `heroes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recursos`
--
ALTER TABLE `recursos`
  ADD CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`id_heroe`) REFERENCES `heroes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `recursos_ibfk_2` FOREIGN KEY (`clase`) REFERENCES `recurso_clase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_ibfk_1` FOREIGN KEY (`id`) REFERENCES `heroes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tokenadmin`
--
ALTER TABLE `tokenadmin`
  ADD CONSTRAINT `tokenadmin_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuariosadmin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
