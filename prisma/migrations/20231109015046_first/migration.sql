-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreRol` VARCHAR(191) NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `cedula` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `tipoPersona` ENUM('E', 'D', 'A') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonaRol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rolId` INTEGER NOT NULL,
    `personaId` INTEGER NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trimestre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreGrado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreMateria` VARCHAR(191) NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,
    `idGrado` INTEGER NOT NULL,
    `idTrimestre` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocenteAsignatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPersona` INTEGER NOT NULL,
    `idAsignatura` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstudianteAsignatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPersona` INTEGER NOT NULL,
    `idAsignatura` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calificacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valorNota` DOUBLE NOT NULL,
    `idAsignatura` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAsignatura` INTEGER NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,
    `idPersona` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonaRol` ADD CONSTRAINT `PersonaRol_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaRol` ADD CONSTRAINT `PersonaRol_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignatura` ADD CONSTRAINT `Asignatura_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignatura` ADD CONSTRAINT `Asignatura_idTrimestre_fkey` FOREIGN KEY (`idTrimestre`) REFERENCES `Trimestre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocenteAsignatura` ADD CONSTRAINT `DocenteAsignatura_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocenteAsignatura` ADD CONSTRAINT `DocenteAsignatura_idAsignatura_fkey` FOREIGN KEY (`idAsignatura`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteAsignatura` ADD CONSTRAINT `EstudianteAsignatura_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstudianteAsignatura` ADD CONSTRAINT `EstudianteAsignatura_idAsignatura_fkey` FOREIGN KEY (`idAsignatura`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Calificacion` ADD CONSTRAINT `Calificacion_idAsignatura_fkey` FOREIGN KEY (`idAsignatura`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_idAsignatura_fkey` FOREIGN KEY (`idAsignatura`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
