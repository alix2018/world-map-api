import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(`App running on port ${port}`));