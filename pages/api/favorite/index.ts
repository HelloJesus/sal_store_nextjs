import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import serverAuth from "../serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(405).end()
    }
    try {
        const { currentUser }: any = await serverAuth(req, res)
        if (!currentUser) throw new Error("Not login")

        if (req.method === 'GET') {
            const data = await prisma.favorites.findMany({
                where: {
                    userId: currentUser.id
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
        }
    } catch (error) {
        return  error;
    }

}