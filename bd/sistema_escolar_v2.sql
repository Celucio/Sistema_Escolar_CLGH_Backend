CREATE DATABASE sistema_escolar_v2;
USE sistema_escolar_v2;

CREATE TABLE rol(
    id INT PRIMARY KEY,
    nombre_rol VARCHAR(100)
)

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

CREATE TABLE persona.rol(
    id_rol INT,
    id_persona VARCHAR,
    id_adminitrador VARCHAR,
    estado ENUM('ACTIVO', 'INACTIVO'),
    FOREIGN KEY (id_rol) REFERENCES rol(id),
    FOREIGN KEY (id_persona) REFERENCES persona(id),
    FOREIGN KEY (id_adminitrador) REFERENCES administrador(id)
);

CREATE TABLE estudiante(
    id VARCHAR(100) PRIMARY KEY,
    tipo_sangre VARCHAR(50)
);

CREATE TABLE docente(
    id VARCHAR(100) PRIMARY KEY,
    especializacion VARCHAR(100)
);

CREATE TABLE administrador(
    id VARCHAR(100),
    tipo_administador VARCHAR(100)
);