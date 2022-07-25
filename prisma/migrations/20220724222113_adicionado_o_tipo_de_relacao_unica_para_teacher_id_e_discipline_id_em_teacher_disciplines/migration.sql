/*
  Warnings:

  - A unique constraint covering the columns `[disciplineId,teacherId]` on the table `teachersDisciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teachersDisciplines_disciplineId_teacherId_key" ON "teachersDisciplines"("disciplineId", "teacherId");
