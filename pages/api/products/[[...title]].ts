import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const { title = '', page = '0', price = '', brand = '' }: any = req.query

        const lowPrice = Number(price.split('-')[0]) || 0
        const highPrice = Number(price.split('-')[1]) || 1000
        const brandReplace = brand !== '' ? brand.replaceAll('-', ' ') : undefined
        const pageStart = page === '0' ? 0 : 8 * page
        const pageEnd = page === '0' ? 8 : 8 + 8 * page

        // const data = await prisma.category.findMany({
        //     where: {
        //         title: title[0]
        //     },
        //     include: {
        //         subcategory: {
        //             where: {
        //                 title: title[1]
        //             },
        //             include: {
        //                 products: {
        //                     skip: 2,
        //                     take: 10,
        //                     where: {
        //                         price: {
        //                             gte: lowPrice,
        //                             lte: highPrice
        //                         },
        //                         brands: brandReplace
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
        const data = await prisma.products.findMany({
            // skip: 8 * page,
            // take: 8,
            where: {
                price: {
                    gte: lowPrice,
                    lte: highPrice
                },
                brands: brandReplace
            },
            include: {
                subcategory: {
                    include: {
                        category: true
                    }
                }
            }
        })
        
        const sortData = data.filter((product: any) => {
            
            if (product && product.subcategory.category.title === title[0]) {
                if (title[1] && product.subcategory.title === title[1]) {
                    return product
                }
                if (!title[1]) {
                    return product
                }
            } else if (product && product.subcategory.category.title === title[0]) {
                return product
            } else if (product && !title[0] && title[1] && product.subcategory.title === title[1]) {
                return product
            } else if (!title) {
                return product
            }
        }).slice(pageStart, pageEnd)
        
        return res.status(200).json(sortData)
    } catch (error) {
        return res.status(400).end()
    }

}