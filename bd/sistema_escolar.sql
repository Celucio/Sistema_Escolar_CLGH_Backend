CREATE DATABASE sistema_escolar;
USE sistema_escolar;
-- Crear la tabla Estudiante
CREATE TABLE Estudiante (
    ID_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Cedula VARCHAR(20),
    Fecha_de_nacimiento DATE,
    Direccion VARCHAR(255),
    Correo VARCHAR(255),
    Celular VARCHAR(20)
);

-- Crear la tabla Administrador
CREATE TABLE Administrador (
    Usuario VARCHAR(255) PRIMARY KEY,
    Contraseña VARCHAR(255)
);

-- Crear la tabla Docente
CREATE TABLE Docente (
    ID_docente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Fecha_de_nacimiento DATE,
    Direccion VARCHAR(255),
    Correo VARCHAR(255),
    Celular VARCHAR(20),
    Especializacion VARCHAR(255)
);

-- Crear la tabla Asignatura
CREATE TABLE Asignatura (
    NRC INT PRIMARY KEY,
    Nombre_Materia VARCHAR(255)
);
-- Crear la tabla Periodo
CREATE TABLE Periodo (
    ID_Periodo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_del_Periodo VARCHAR(255),
    Fecha_Inicio DATE,
    Fecha_Fin DATE
);

-- Crear la tabla Calificacion
CREATE TABLE Calificacion (
    ID_Calificacion INT AUTO_INCREMENT PRIMARY KEY,
    ID_Matricula INT,
    Valor_de_la_Nota DECIMAL(5, 2),
    FOREIGN KEY (ID_Matricula) REFERENCES Matricula(ID_Matricula)
);

-- Crear la tabla Matricula
CREATE TABLE Matricula (
    ID_Matricula INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT,
    ID_docente INT,
    NRC INT,
    ID_Periodo INT,
    Estado ENUM('ACTIVO', 'INACTIVO'),
    FOREIGN KEY (ID_Usuario) REFERENCES Estudiante(ID_estudiante),
    FOREIGN KEY (NRC) REFERENCES Asignatura(NRC),
    FOREIGN KEY (ID_Periodo) REFERENCES Periodo(ID_Periodo),
    FOREIGN KEY (ID_docente) REFERENCES Docente(ID_docente)
);


