import * as React from 'react';

interface EmailTemplateProps {
    times: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                          times,
                                                                      }) => (
    <div>
        <h1>You selected the following times:</h1>
        <p>Times: {times}</p>
    </div>
);