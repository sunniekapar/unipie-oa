import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { decrypt } from './utils/jwt';

config({ path: '../.env' });

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || '5000';

app.use(async (request: Request, response: Response, next: NextFunction) => {
  let token;
  if (request.headers['authorization'])
    token = request.headers['authorization'].split(' ')[1];

  if (!token)
    return response.status(401).json({ error: 'User not authenticated' });

  try {
    const verified = await decrypt(token);
    console.log('Token verified:', verified);
    next();
  } catch (error) {
    console.error('Token verification failed:');
    return response.status(401).json({ error: 'Invalid token' });
  }
});

app.get('/forecast', async (request: Request, response: Response) => {
  try {
    const { lat, lon } = request.query;
    if (!lat && !lon)
      return response.status(400).json({ error: 'Location not provided' });

    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    );

    if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text();
      return response.status(apiResponse.status).json({ error: errorMessage });
    }

    const data = await apiResponse.json();

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/weather', async (request: Request, response: Response) => {
  try {
    const { lat, lon } = request.query;
    if (!lat && !lon)
      return response.status(400).json({ error: 'Location not provided' });

    const apiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`
    );

    if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text();
      return response.status(apiResponse.status).json({ error: errorMessage });
    }

    const data = await apiResponse.json();

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/locations', async (request: Request, response: Response) => {
  try {
    const { location } = request.query;
    if (!location)
      return response.status(400).json({ error: 'Location not provided' });

    const apiResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&APPID=${process.env.API_KEY}`
    );

    if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text();
      return response.status(apiResponse.status).json({ error: errorMessage });
    }

    const data = await apiResponse.json();

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on port: ${port}`);
});
