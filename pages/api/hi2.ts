import {NextApiRequest, NextApiResponse} from "next";

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ message: 'If dugtrio is 50/50 female/male, does that mean one of the heads is intersex?' })
  }