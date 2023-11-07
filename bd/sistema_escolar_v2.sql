CREATE DATABASE sistema_escolar_v2;
USE sistema_escolar_v2;

CREATE TABLE rol(
    id INT PRIMARY KEY,
    nombre_rol VARCHAR(100),
    estado ENUM('A', 'I')
);

CREATE TABLE persona(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    cedula VARCHAR(20),
    fecha_de_nacimiento DATE,
    direccion VARCHAR(255),
    correo VARCHAR(255),
    celular VARCHAR(20),
    tipo_persona ENUM('E', 'D', 'A')
);

CREATE TABLE persona_rol(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    id_rol INT,
    id_persona VARCHAR(100),
    estado ENUM('A', 'I'),
    FOREIGN KEY (id_rol) REFERENCES rol(id),
    FOREIGN KEY (id_persona) REFERENCES persona(id)
);

CREATE TABLE trimestre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_trimestre VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE
);

CREATE TABLE grado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_grado VARCHAR(100),
    id_trimestre INT,
    FOREIGN KEY (id_trimestre) REFERENCES trimestre(id)
);

-- Crear la tabla Asignatura
CREATE TABLE asignatura (
    id VARCHAR(100) PRIMARY KEY,
    nombre_materia VARCHAR(255),
    id_grado INT,
    estado ENUM('A', 'I'),
    FOREIGN KEY (id_grado) REFERENCES grado(id)
);

CREATE TABLE docente_asignatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_persona VARCHAR(100), -- La ID de la persona docente
    id_asignatura VARCHAR(100), -- La ID de la asignatura que imparte
    FOREIGN KEY (id_persona) REFERENCES persona(id), -- Clave foránea a la tabla "persona"
    FOREIGN KEY (id_asignatura) REFERENCES asignatura(id) -- Clave foránea a la tabla "asignatura"
);

CREATE TABLE estudiante_asignatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_persona VARCHAR(100), -- La ID de la persona estudiante
    id_asignatura VARCHAR(100), -- La ID de la asignatura tomada
    FOREIGN KEY (id_persona) REFERENCES persona(id), -- Clave foránea a la tabla "persona"
    FOREIGN KEY (id_asignatura) REFERENCES asignatura(id) -- Clave foránea a la tabla "asignatura"
);


CREATE TABLE calificacion(
	id INT AUTO_INCREMENT PRIMARY key,
	id_asignatura VARCHAR(100),
	valor_nota DECIMAL(5, 2),
	FOREIGN KEY (id_asignatura) REFERENCES asignatura(id)
);


-- Crear la tabla Matricula
CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_asignatura VARCHAR(200),
    estado ENUM('A', 'I'),
    id_persona VARCHAR(100),
    FOREIGN KEY (id_asignatura) REFERENCES asignatura(id),
    FOREIGN KEY (id_persona) REFERENCES persona(id)
);

