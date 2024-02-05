/*
  Warnings:

  - You are about to alter the column `estado` on the `actividadeseducativas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(9))`.
  - You are about to alter the column `nombreGrado` on the `grado` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - You are about to alter the column `estado` on the `periodo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(9))`.
  - You are about to alter the column `nombrePeriodo` on the `periodocalificaciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(6))`.
  - You are about to alter the column `estado` on the `periodocalificaciones` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(9))`.
  - A unique constraint covering the columns `[nombreGrado]` on the table `Grado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[anioLectivo]` on the table `Periodo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombrePeriodo]` on the table `PeriodoCalificaciones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `actividadeseducativas` MODIFY `estado` ENUM('A', 'I') NOT NULL;

-- AlterTable
ALTER TABLE `grado` MODIFY `nombreGrado` ENUM('P', 'S', 'T', 'C', 'Q', 'X', 'M') NOT NULL;

-- AlterTable
ALTER TABLE `periodo` MODIFY `estado` ENUM('A', 'I') NOT NULL;

-- AlterTable
ALTER TABLE `periodocalificaciones` MODIFY `nombrePeriodo` ENUM('P', 'S', 'T') NOT NULL,
    MODIFY `estado` ENUM('A', 'I') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Grado_nombreGrado_key` ON `Grado`(`nombreGrado`);

-- CreateIndex
CREATE UNIQUE INDEX `Periodo_anioLectivo_key` ON `Periodo`(`anioLectivo`);

-- CreateIndex
CREATE UNIQUE INDEX `PeriodoCalificaciones_nombrePeriodo_key` ON `PeriodoCalificaciones`(`nombrePeriodo`);

-- CreateIndex
CREATE UNIQUE INDEX `Persona_cedula_key` ON `Persona`(`cedula`);
