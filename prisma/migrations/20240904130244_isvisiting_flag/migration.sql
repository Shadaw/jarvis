/*
  Warnings:

  - Added the required column `is_visiting` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "is_visiting" BOOLEAN NOT NULL;
