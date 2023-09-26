/*
  Warnings:

  - You are about to drop the `_ProductsToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductsToUser" DROP CONSTRAINT "_ProductsToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToUser" DROP CONSTRAINT "_ProductsToUser_B_fkey";

-- DropTable
DROP TABLE "_ProductsToUser";

-- CreateTable
CREATE TABLE "favorites" (
    "user_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("user_id","product_id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
