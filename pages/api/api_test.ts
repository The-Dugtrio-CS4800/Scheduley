import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ message: 'If Dugtrio is 50/50 F/M, does that mean one of the heads is intersex?' })
  }