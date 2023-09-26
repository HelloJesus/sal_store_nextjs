import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import serverAuth from "../serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(405).end()
    }
    try {
        const { currentUser }:any = await serverAuth(req, res)
        const { id: productId }:any = req.query

        if (req.method === 'POST') {
            const data = await prisma.favorites.create({
                data: {
                    userId: currentUser?.id,
                    productId: Number(productId)
                }
            })

            return res.status(200).json(data)
        }

        if (req.method === 'GET') {
            if (!currentUser) return res.status(200).json(null)

            const data = await prisma.favorites.findFirst({
                where: {
                    userId: currentUser.id,
                    productId: Number(productId)
                }
            })

            return res.status(200).json(data)
        }

        if (req.method === 'DELETE') {
            const data = await prisma.favorites.delete({
                where: {
                    userId_productId: {
                        userId: currentUser?.id,
                        productId: Number(productId)
                    }
                }
            })

            return res.status(200).json(data)
        }
    } catch (error) {
        return res.status(400).end(error)
    }

}