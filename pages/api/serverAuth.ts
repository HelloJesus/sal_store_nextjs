import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    // let message: Boolean = false

    if (!session?.user?.email) {
        return {currentUser: null}
        // return { message: 'Not authorized' }
        // throw new Error("Not authorized!")
    }
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currentUser) {
        // return { message: 'Not authorized' }
        return {currentUser: null}
        // throw new Error('Not authorized!')
    }

    return { currentUser }

}

export default serverAuth