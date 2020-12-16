import express from 'express';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import cors from 'cors'

const app:express.Application = express();
const port:number = 3000;
const key:string = '/projects/labs/rsa/private.key'
const expirationToken:number = 60 * 60 * 24;

app.use(bodyParser.json());
app.use(cors());
app.route('/api/login').post(login);

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

        res.status(200).json({ token: jwtBearerToken, expirenIn: ""});
    } else {
        res.status(400).json({ message: "Usuario o contraseña incorrectas." }); 
    }
}

function validateUser(user: string, password: string): boolean {
    return true;
}

function findUserForEmail(email:string): string {
    return "uid";
}

app.listen(port, (): void => console.log(`server is listening on ${port}`));
