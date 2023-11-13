import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/emailtemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.body)
        const { times } = JSON.parse(req.body);


        const data = await resend.emails.send({
            from: 'Scheduley <onboarding@resend.dev>',
            to: ['tmrfandom@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ times: times.times }),
        });


        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
};