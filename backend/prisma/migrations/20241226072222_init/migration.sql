-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Menu_parentId_idx" ON "Menu"("parentId");

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
