CREATE DATABASE sistema_escolar_v2;
USE sistema_escolar_v2;

CREATE TABLE rol(
    id INT PRIMARY KEY,
    nombre_rol VARCHAR(100)
);

CREATE TABLE persona(
    id VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    cedula VARCHAR(20),
    fecha_de_nacimiento DATE,
    direccion VARCHAR(255),
    correo VARCHAR(255),
    celular VARCHAR(20)
);

CREATE TABLE estudiante(
    id VARCHAR(100) PRIMARY KEY,
    tipo_sangre VARCHAR(50),
    FOREIGN KEY (id) REFERENCES persona(id)
);

CREATE TABLE docente(
    id VARCHAR(100) PRIMARY KEY,
    especializacion VARCHAR(100),
     FOREIGN KEY (id) REFERENCES persona(id)
);

CREATE TABLE administrador(
    id VARCHAR(100) PRIMARY KEY,
    tipo_administrador VARCHAR(100),
    FOREIGN KEY (id) REFERENCES persona(id)
);


CREATE TABLE persona_rol(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    id_rol INT,
    id_persona VARCHAR(100),
    estado ENUM('ACTIVO', 'INACTIVO'),
    FOREIGN KEY (id_rol) REFERENCES rol(id),
    FOREIGN KEY (id_persona) REFERENCES persona(id)
);


CREATE TABLE grado(
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre_grado VARCHAR(100)
);
-- Crear la tabla Periodo
CREATE TABLE trimestre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_trimestre VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE,
    id_grado INT,
    FOREIGN KEY (id_grado) REFERENCES grado(id)
);

-- Crear la tabla Asignatura
CREATE TABLE asignatura (
    id VARCHAR(100) PRIMARY KEY,
    nombre_materia VARCHAR(255),
    id_trimestre INT,
    FOREIGN KEY (id_trimestre) REFERENCES trimestre(id)
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
    estado ENUM('ACTIVO', 'INACTIVO'),
    id_persona VARCHAR(100),
    FOREIGN KEY (id_asignatura) REFERENCES asignatura(id),
    FOREIGN KEY (id_persona) REFERENCES persona(id)
);

