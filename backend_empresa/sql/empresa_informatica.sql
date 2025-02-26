-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 04-02-2025 a las 13:01:05
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresa_informatica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id_departamento` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `presupuesto` decimal(10,2) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id_departamento`, `nombre`, `ubicacion`, `presupuesto`, `fecha_creacion`) VALUES
(1, 'Recursos Humanos', 'Madrid', 50000.00, '2025-02-04 12:47:23'),
(2, 'Telefonia', 'Barcelona', 70000.00, '2025-02-04 12:47:23'),
(3, 'Marketing', 'Madrid', 40000.00, '2025-02-04 12:47:23'),
(4, 'Electronica', 'Jaen', 23456.00, '2025-02-04 12:47:23'),
(5, 'Aplicaciones Web', 'Coria', 50000.00, '2025-02-04 12:47:23'),
(6, 'Desarrollo de Software', 'Valencia', 80000.00, '2025-02-04 12:47:23'),
(7, 'Atención al Cliente', 'Sevilla', 30000.00, '2025-02-04 12:47:23'),
(8, 'Jefatura', 'Alcalá de Guadaira', 1.00, '2025-02-04 12:58:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `fecha_contratacion` date NOT NULL,
  `id_departamento` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre`, `email`, `salario`, `fecha_contratacion`, `id_departamento`) VALUES
(1, 'Carlos López', 'carlos@empresa.com', 3000.00, '2023-06-15', 1),
(2, 'Laura Martínez', 'laura.martinez@empresa.com', 38000.00, '2021-05-12', 2),
(3, 'Sergio Ramírez', 'sergio.dev@empresa.com', 5000.00, '2017-04-18', 2),
(4, 'Cristina López', 'cristina.dev@empresa.com', 4300.00, '2023-01-12', 2),
(5, 'Javier Castillo', 'xjcaslim103@ieshnosmachado.org', 1.00, '1998-12-19', 8),
(6, 'Juan Pérez', 'juan.perez@empresa.com', 2800.00, '2023-03-01', 1),
(7, 'Miguel Torres', 'miguel.torres@empresa.com', 4200.00, '2023-07-15', 3),
(8, 'Rosa Sánchez', 'rosa.sanchez@empresa.com', 2900.00, '2022-12-01', 3),
(9, 'Ana Gómez', 'ana.gomez@empresa.com', 3100.00, '2023-08-10', 3),
(10, 'David Martín', 'david.martin@empresa.com', 4500.00, '2023-04-05', 4),
(11, 'Luis Fernández', 'luis.fernandez@empresa.com', 5000.00, '2022-06-01', 4),
(12, 'Mario Gómez', 'mario.gomez@empresa.com', 3800.00, '2023-02-17', 5),
(13, 'Elena Ruiz', 'elena.ruiz@empresa.com', 3200.00, '2023-03-25', 5),
(14, 'Pedro Sánchez', 'pedro.sanchez@empresa.com', 4100.00, '2022-11-20', 6),
(15, 'Isabel López', 'isabel.lopez@empresa.com', 4700.00, '2022-09-01', 6),
(16, 'Carlos Martínez', 'carlos.martinez@empresa.com', 3500.00, '2022-07-12', 7),
(17, 'José Rodríguez', 'jose.rodriguez@empresa.com', 3100.00, '2023-10-01', 7),
(18, 'Laura Fernández', 'laura.fernandez@empresa.com', 3900.00, '2023-01-01', 1),
(19, 'José García', 'jose.garcia@empresa.com', 4300.00, '2023-03-01', 2),
(20, 'Marta Sánchez', 'marta.sanchez@empresa.com', 4000.00, '2023-05-20', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_departamento` (`id_departamento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id_departamento` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id_empleado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id_departamento`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
