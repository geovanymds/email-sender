import MailGen from 'mailgen';
import mail from '../config/mail/mailConfig';

export default {
    key: 'email_sender',
    async handle ( {data}:any ) {

        try {
        const { email, firstName, lastName } = data;

        const mailGenerator = new MailGen({
            theme: 'salted',
            product: {
                name: 'Curso de REDIS',
                link: 'https://www.youtube.com/watch?v=HMEwYxXFTjM',
                logo: `${process.env.APP_URL}/public/assets/logo_redis.png`
            }
        });

        const emailBody = {
            body: {
                name: firstName,
                intro: `Olá ${firstName} ${lastName}. Você foi convidado para assistir nosso minicurso de Redis presente no link. Esperamos que vocês aproveitem !`,
                action: {
                    instructions: 'Ir para sua página:',
                    button: {
                        color: '#A51F17',
                        text: 'Minicurso de redis.',
                        link: 'https://www.youtube.com/watch?v=HMEwYxXFTjM'
                    }
                },
                greeting: 'Olá'
            }
        };

        const emailTemplate = mailGenerator.generate(emailBody);

        return await mail.sendMail({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
            to: `${firstName} <${email}>`,
            subject: 'Convite para o minicurso de redis.',
            html: emailTemplate
        });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    },
    async listener () {
        console.log('Email enviado!');
    }
};
