-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CashMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "association" TEXT NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cash" DECIMAL NOT NULL,
    "dateToPay" DATETIME,
    "userId" INTEGER NOT NULL DEFAULT 0,
    "typeMovementId" INTEGER NOT NULL,
    CONSTRAINT "CashMovement_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CashMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CashMovement_typeMovementId_fkey" FOREIGN KEY ("typeMovementId") REFERENCES "TypeMovement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cash" DECIMAL NOT NULL,
    "initialCash" DECIMAL NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TypeMovement_name_key" ON "TypeMovement"("name");
