import dotenv from "dotenv";
import { resolve } from 'path';
import Agent from 'socks5-https-client/lib/Agent';

dotenv.config({ path: resolve(__dirname, '../.env') });

const { PROXY_HOST, PROXY_PORT, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

export const socksAgent = new Agent({
  socksHost: PROXY_HOST,
  socksPort: PROXY_PORT,
  socksUsername: PROXY_USERNAME,
  socksPassword: PROXY_PASSWORD,
});