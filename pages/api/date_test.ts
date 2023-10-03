import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

// example method using dayjs library that displays current time
const currentDate = dayjs();
const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
console.log(formattedDate);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send(formattedDate)
  }