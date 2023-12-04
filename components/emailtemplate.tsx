import * as React from 'react';


interface EmailTemplateProps {
    participantNames: string[];
    //name: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({participantNames}) =>{
    return(
    <div>
        <h1>The following people have filled out their meeting times:</h1>
        {/*<p>{name}</p>*/}
        {participantNames.map((participant) => {
            return <li>{participant}</li>
        })}
    </div>
)};