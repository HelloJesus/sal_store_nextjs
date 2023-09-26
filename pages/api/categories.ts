import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        // const products = await prisma.category.findMany()
        const products = await prisma.category.findMany({
            where: {
                title: "men"
            },
            include: {
                subcategory: {
                    include: {
                        products: true
                    }
                }
              }
        })
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).end()
    }
}
