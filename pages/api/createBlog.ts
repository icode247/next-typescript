import type { NextApiRequest, NextApiResponse } from 'next'
import { blogs, IBlog } from "./interface/blog";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IBlog | any>
) {
    if (req.method === 'POST') {
        const { formInputs } = req.body;
        const blog: IBlog = {
            title: formInputs.title,
            content: formInputs.content,
            cover: formInputs.cover,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        blogs.push(blog)
        res.status(200).json(blog)
    } else {
        //respons with error message
        res.status(404).json({
            message: 'Not found'
        })
    }
}