import express from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import cors from 'cors'

const app:express.Application = express();
const port:number = 3000;
const key:string = '/lsf/rsa/private.key';
const expirationToken:number = 60 * 60 * 24;

app.use(bodyParser.json());
app.use(cors());
app.route('/api/login').post(login);
app.route('/api/register').post(register);
app.route('/api/programmer').post(programmer);
app.route('/api/delete').post(deleteInterview);
app.route('/api/calendar').get(calendar);
app.route('/api/interview').post(interview);

const RSA_PRIVATE_KEY = fs.readFileSync(key);

export function login(req: express.Request, res: express.Response) {
    const email: string = req.body.email, password: string = req.body.password;

    if (validateUser(email, password)) {
        const userId: string = findUserForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: expirationToken,
            subject: userId
        });

        res.status(200).json({ token: jwtBearerToken, expirenIn: expirationToken});
    } else {
        res.status(400).json({ message: "Usuario o contraseña incorrectas." }); 
    }
}

export function register(req: express.Request, res: express.Response) {
    res.status(200).json({ message: "Se ha registrado correctamente" });
}

export function programmer(req: express.Request, res: express.Response) {
    res.status(200).json({ message: "Se ha programado la entrevista correctamente" });
}

export function deleteInterview(req: express.Request, res: express.Response) {
    res.status(200).json({ message: "Se ha eliminado la entrevista correctamente" });
}

export function interview(req: express.Request, res: express.Response) {
    res.status(200).json({
        title: 'Entrevista Gerente de Proyectos',
        start: '2021-01-09 15:00:00',
        end: '2021-01-09 16:00:00',
        id: '3',
        email: 'correo@entrevistado.com'
      });
}

export function calendar(req: express.Request, res: express.Response) {
    res.status(200).json([{
        title: 'Entrevista Desarrollador de Software',
        start: '2021-03-01 23:00',
        end: '2021-03-01 23:30',
        id: '1'
      },
      {
        title: 'Entrevista Arquitecto de Software',
        start: '2021-03-07 11:00',
        end: '2021-03-07 12:00',
        id: '2'
      },
      {
        title: 'Entrevista Gerente de Proyectos',
        start: '2021-03-09 15:00',
        end: '2021-03-09 16:00',
        id: '3'
      }]);
}

function validateUser(user: string, password: string): boolean {
    if(user == "correo@entrevistador.com" && password == "entrevistador")
    {
        return true;
    }

    if(user == "correo@entrevistado.com" && password == "entrevistado")
    {
        return true;
    }

    return false;
}

function findUserForEmail(email:string): string {
    return "uid";
}

app.listen(port, (): void => console.log(`server is listening on ${port}`));
