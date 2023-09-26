import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import serverAuth from "../serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const { currentUser }: any = await serverAuth(req, res)

        if (!currentUser) return res.status(200).json(null)

        const data = await prisma.cart.findMany({
            where: {
                userId: currentUser && currentUser?.id,
            },
            include: {
                products: {
                    select: {
                        id: true,
                        title: true,
                        brands: true,
                        image_l: true
                    }
                }
            }
        })
        return res.status(200).json(data)

    } catch (error) {
        return res.status(400).end(error)
    }

}