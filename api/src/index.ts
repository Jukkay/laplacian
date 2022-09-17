import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getURL } from './utilities/getURL';

const app: express.Application = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/images', express.static('./images'));

// Server start
app.listen(process.env.PORT, () => {
	console.log(`API running at ${getURL()}`);
});
