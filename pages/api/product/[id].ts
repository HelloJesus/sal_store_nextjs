import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const id = Number(req.query.id)
        // const data = await prisma.products.findUnique({
        //     where: {
        //         id: id
        //     }
        // })

        const { title = '', price = '' } = req.query
        const data = await prisma.products.findMany({
            where: {
                id: id
            },
            include: {
                subcategory: true,
                images: true
            }
        })


        return res.status(200).json(data[0])
    } catch (error) {
        return res.status(400).end()
    }

}