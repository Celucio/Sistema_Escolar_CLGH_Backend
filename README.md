# Sistema Escolar - Proyecto de Tesis 
Integrantes: Carlos Enrique Lucio, Genesis Belén Heredia

Este repositorio presenta la codificación realizada en node.js para el backend del sistema escolar

Dicho sistema cuenta con las siguientes entidades: 

# Estudiante

-ID de estudiante (clave primaria)

-Nombre

-Apellido

-Cedula

-Fecha de nacimiento

-Dirección

-Correo

-Celular

# Administador

-Usuario

-Contraseña

# Docente

-ID de docente (clave primaria)

-Nombre

-Apellido

-Fecha de nacimiento

-Dirección

-Correo

-Celular

-Especialización


# Asignatura

-NRC (Clave Primaria)

-Nombre Materia

# Calificacion

-ID de Calificacion (Clave primaria)

-ID_Matricula (Clave Foranea)

-Valor de la Nota


# Matricula

-ID de Matricula (Clave Primaria) 

-ID de Usuario (Clave Foranea)

-ID de Docente (Clave Foranea)

-NRC (Clave Foranea)

-ID del Periodo (Clave Foranea)

-Estado ("ACTIVO", "INACTIVO")


# Periodo

-ID del Periodo (Clave Primaria)

-Nombre del Periodo

-Fecha Inicio

-Fecha Fin

Dentro de este contenido se mostrarán todas las peticiones del sistema escolar en función a las entidades antes presentadas
