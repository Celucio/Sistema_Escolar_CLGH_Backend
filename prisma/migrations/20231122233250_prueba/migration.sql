-- AlterTable
ALTER TABLE `persona` MODIFY `fechaNacimiento` DATETIME(3) NOT NULL,
    MODIFY `tipoPersona` ENUM('E', 'D', 'A', 'S') NOT NULL;
