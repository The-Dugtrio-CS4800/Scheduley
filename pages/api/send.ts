import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/emailtemplate';
import { Resend } from 'resend';
import * as dotenv from "dotenv";
import * as React from "react";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate = (participantNames) => {
    let nameString = ""
    for (let i = 0; i < participantNames.length; i++){
        nameString += `<li>` + participantNames[i] + `</li>`
    }

    return(
        `<div>
            <h1>The following people have filled out their meeting times:</h1>
            ${nameString}
    </div>`
)}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        // console.log(req.body)
        // const test  = JSON.parse(req.body);
        const request = JSON.parse(req.body)
        console.log("request sent:" + JSON.stringify(request))
        console.log(request.participantNames)

        const data = await resend.emails.send({
            from: 'Scheduley <onboarding@resend.dev>',
            to: [request.email],
            subject: 'Hello world',
            //text: request.email
            html: emailTemplate(request.participantNames)
            //react: EmailTemplate(request.participantNames),
        });


        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
};