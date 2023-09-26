import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const categories = await prisma.category.findMany({
            include: {
                subcategory: {
                    include: {
                        products: true
                    }
                }
            }
        })

        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)

        return res.status(400).end()
    }

}