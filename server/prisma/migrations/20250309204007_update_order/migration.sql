/*
  Warnings:

  - Added the required column `receiverEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `closedAt` DATETIME(3) NULL,
    ADD COLUMN `receiverEmail` VARCHAR(100) NOT NULL,
    ADD COLUMN `receiverName` VARCHAR(50) NOT NULL;
