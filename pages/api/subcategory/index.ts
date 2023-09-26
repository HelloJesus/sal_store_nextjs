import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        if (req.method === 'POST'){
            const subcategory = await prisma.subCategory.create({data: {title: "pants", categoryTitle: "women"}})
        
            return res.status(200).json(subcategory)
        }

        if (req.method === 'GET'){
            const subcategory = await prisma.subCategory.findMany({})
        
            return res.status(200).json(subcategory)
        }
    } catch (error) {
        console.log(error)

        return res.status(400).end()
    }

}