import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
    try {
        const dataNew = { title: "women"}
        const categories = await prisma.category.create({data: dataNew})

        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)

        return res.status(400).end()
    }

}
