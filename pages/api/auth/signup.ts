import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { email, name, password } = req.body

        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userExists) {
            return res.status(422).end({ error: 'Email taken' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid method' })
    }
}