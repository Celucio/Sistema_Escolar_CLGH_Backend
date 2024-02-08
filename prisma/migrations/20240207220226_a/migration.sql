/*
  Warnings:

  - You are about to drop the column `fechaFin` on the `actividadeseducativas` table. All the data in the column will be lost.
  - You are about to alter the column `nombreRol` on the `rol` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - A unique constraint covering the columns `[nombreRol]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `actividadeseducativas` DROP COLUMN `fechaFin`;

-- AlterTable
ALTER TABLE `rol` MODIFY `nombreRol` ENUM('E', 'D', 'A') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rol_nombreRol_key` ON `Rol`(`nombreRol`);
