CREATE DATABASE sistema_escolar;
USE sistema_escolar;
-- Crear la tabla Estudiante
CREATE TABLE estudiante (
    id VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    cedula VARCHAR(20),
    fecha_de_nacimiento DATE,
    direccion VARCHAR(255),
    correo VARCHAR(255),
    celular VARCHAR(20)
);

-- Crear la tabla Administrador
CREATE TABLE administrador (
    usuario VARCHAR(255) PRIMARY KEY,
    contraseña VARCHAR(255)
);

-- Crear la tabla Docente
CREATE TABLE docente (
    id VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    fecha_de_nacimiento DATE,
    direccion VARCHAR(255),
    correo VARCHAR(255),
    celular VARCHAR(20),
    especializacion VARCHAR(255)
);

-- Crear la tabla Asignatura
CREATE TABLE asignatura (
    nrc INT PRIMARY KEY,
    nombre_materia VARCHAR(255)
);
-- Crear la tabla Periodo
CREATE TABLE periodo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_periodo VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Crear la tabla Calificacion
CREATE TABLE calificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_matricula INT,
    valor_nota DECIMAL(5, 2),
    FOREIGN KEY (id_matricula) REFERENCES matricula(id)
);

-- Crear la tabla Matricula
CREATE TABLE matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante VARCHAR(100),
    id_docente VARCHAR(100),
    nrc INT,
    id_periodo INT,
    estado ENUM('ACTIVO', 'INACTIVO'),
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id),
    FOREIGN KEY (nrc) REFERENCES asignatura(nrc),
    FOREIGN KEY (id_periodo) REFERENCES periodo(id),
    FOREIGN KEY (id_docente) REFERENCES docente(id)
);


