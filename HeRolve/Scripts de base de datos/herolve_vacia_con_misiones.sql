-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2014 a las 20:30:31
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci AUTO_INCREMENT=18 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

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
