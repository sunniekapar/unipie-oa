import express, { type Express, type Request, type Response } from 'express';
import { config } from 'dotenv';

config({ path: '../.env' });

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || '5000';

app.post('/createUser', async (request: Request, response: Response) => {
 
});

app.listen(port, () => {
  return console.log(`Server is listening on port: ${port}`);
});
