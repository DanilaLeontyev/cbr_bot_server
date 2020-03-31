import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import router from './routes/index';
import connect from './connect';
import dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen('3000', () => {
  console.log('App listen on port 3000')
})

const db = process.env.MONGO_URL

connect({ db })
router({ app })