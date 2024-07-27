import { insertUser } from '../db/queries';
import express, { type Express, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || '5000';

app.post('/createUser', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(body.password + salt, 10);

    const result = await insertUser({
      ...body,
      password: hashedPassword,
      salt: salt,
    });
    
    return response.status(201).json(result);
  } catch (error) {
    console.error('Error inserting user:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on port: ${port}`);
});
