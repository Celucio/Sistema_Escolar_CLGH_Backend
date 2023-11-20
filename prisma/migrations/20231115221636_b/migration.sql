/*
  Warnings:

  - Added the required column `estado` to the `ActividadesEducativas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `actividadeseducativas` ADD COLUMN `estado` ENUM('A', 'I') NOT NULL;
