/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` VARCHAR(30) NOT NULL DEFAULT 'pending';
