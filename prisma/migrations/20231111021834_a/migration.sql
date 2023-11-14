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
    `fechaNacimiento` DATE NOT NULL,
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
CREATE TABLE `Periodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anioLectivo` VARCHAR(191) NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreGrado` VARCHAR(191) NOT NULL,
    `persId` INTEGER NOT NULL,

    UNIQUE INDEX `Grado_persId_key`(`persId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` ENUM('A', 'I') NOT NULL,
    `idPersona` INTEGER NOT NULL,
    `idPeriodo` INTEGER NOT NULL,
    `idGrado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeriodoCalificaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrePeriodo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoActividad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreActividad` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActividadesEducativas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `detalleActividad` VARCHAR(191) NOT NULL,
    `fechaInicio` DATE NOT NULL,
    `fechaFin` DATE NOT NULL,
    `tipoActId` INTEGER NOT NULL,
    `perCalId` INTEGER NOT NULL,
    `asignaturaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreMateria` VARCHAR(191) NOT NULL,
    `estado` ENUM('A', 'I') NOT NULL,
    `idGrado` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Act_Est_Notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personaId` INTEGER NOT NULL,
    `actId` INTEGER NOT NULL,
    `valor_nota` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PersonaRol` ADD CONSTRAINT `PersonaRol_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonaRol` ADD CONSTRAINT `PersonaRol_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grado` ADD CONSTRAINT `Grado_persId_fkey` FOREIGN KEY (`persId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_idPersona_fkey` FOREIGN KEY (`idPersona`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_idPeriodo_fkey` FOREIGN KEY (`idPeriodo`) REFERENCES `Periodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadesEducativas` ADD CONSTRAINT `ActividadesEducativas_tipoActId_fkey` FOREIGN KEY (`tipoActId`) REFERENCES `TipoActividad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadesEducativas` ADD CONSTRAINT `ActividadesEducativas_perCalId_fkey` FOREIGN KEY (`perCalId`) REFERENCES `PeriodoCalificaciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActividadesEducativas` ADD CONSTRAINT `ActividadesEducativas_asignaturaId_fkey` FOREIGN KEY (`asignaturaId`) REFERENCES `Asignatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignatura` ADD CONSTRAINT `Asignatura_idGrado_fkey` FOREIGN KEY (`idGrado`) REFERENCES `Grado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Act_Est_Notas` ADD CONSTRAINT `Act_Est_Notas_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Act_Est_Notas` ADD CONSTRAINT `Act_Est_Notas_actId_fkey` FOREIGN KEY (`actId`) REFERENCES `ActividadesEducativas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
