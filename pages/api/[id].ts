import type { NextApiRequest, NextApiResponse } from 'next'
import { blogs, IBlog } from "./interface/blog";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBlog[]>
) {
    res.status(200).json(blogs)
}