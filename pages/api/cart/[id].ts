import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import serverAuth from "../serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(405).end()
    }
    try {
        const { currentUser }:any = await serverAuth(req, res)
        const {id: productId} = req.query

        if (!currentUser) return res.status(200).json(null)

        if (req.method === 'POST') {
            const data = await prisma.cart.create({
                data: {
                    userId: currentUser?.id,
                    productId: Number(productId)
                }
            })

            return res.status(200).json(data)
        }

        if (req.method === 'GET') {
            
            const data = await prisma.cart.findMany({
                where: {
                    userId: currentUser && currentUser?.id,
                }
            })
    
            return res.status(200).json(data)
        }

        if (req.method === 'DELETE') {
            // const { productId } = req.body

            const data = await prisma.cart.delete({
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