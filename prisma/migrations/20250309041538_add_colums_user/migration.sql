/*
  Warnings:

  - A unique constraint covering the columns `[identifyNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifyNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identifyTypeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personTypeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "identifyNumber" TEXT NOT NULL,
ADD COLUMN     "identifyTypeId" INTEGER NOT NULL,
ADD COLUMN     "personTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "IdentifyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IdentifyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PersonType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identifyNumber_key" ON "User"("identifyNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_identifyTypeId_fkey" FOREIGN KEY ("identifyTypeId") REFERENCES "IdentifyType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personTypeId_fkey" FOREIGN KEY ("personTypeId") REFERENCES "PersonType"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
