import 'dotenv/config';
import express from 'express';
import { initLogger, fallbackLogger } from './sentry';
import cors from 'cors';
import rpc from './rpc';
import upload from './upload';
import proxy from './proxy';
import { version } from '../package.json';
import { stats } from './stats';

const app = express();
const PORT = process.env.PORT || 3000;

initLogger(app);

app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: false }));
app.use(cors({ maxAge: 86400 }));
app.use('/', rpc);
app.use('/', upload);
app.use('/', proxy);
app.get('/', (req, res) => res.json({ version, port: PORT, stats }));

fallbackLogger(app);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
