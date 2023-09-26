import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "./serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }

        const {currentUser}: any = await serverAuth(req, res)
     
        // if (currentUser === null || currentUser === undefined) throw new Error("Not authorized!")

        return res.status(200).json(currentUser)
    } catch (error) {

        // const typedError = error as Error
        // return res.status(400).send(typedError.message)
    }
}