import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        // const dataNew = {
        //     title: "sharlock", description: "book", size: 'XL', material: 'Other, Polyester, Wool',
        //     brands: 'Paul & Shark', codeProduct: '23-232', image_l: "test", image_xl: "test",
        //     images: ['1', '2', '3'],
        //     gender: "man", price: 1000, count: 5, subcategoryId: 1
        // }
        const dataNew = { id: 4, title: "men"}


        // const favorites = await prisma.products.findMany()
        const favorites = await prisma.category.create({data: dataNew})
        // const user = await prisma.user.update({
        //     where: {
        //         id: 'clhkslskz0000usqwlujqucio'
        //     },
        //     data: {
        //         email: 'john@gmail.com',
        //         products: { set: [{ id: 1 }] },
        //     },
        // })

        // const user = await prisma.user.update({
        //     where: {
        //         email: 'test11@gmail.com'
        //     },
        //     data: {
        //         email: 'test1@gmail.com'
        //     }
        // })

        return res.status(200).json(favorites)
    } catch (error) {
        console.log(error)

        return res.status(400).end()
    }
}
