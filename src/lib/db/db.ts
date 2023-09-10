import { drizzle } from 'drizzle-orm/node-postgres';
import {Pool} from "pg"
import { users } from './schema';
import {  DATABASE_URL} from '$env/static/private';

const connectionString = process.env.DATABASE_URL;
// const client = postgres({
//     host: DATABASE_URL,
//     port: Number(DATABASE_PORT),
//     database: DATABASE_NAME,
//     user: DATABASE_USER,
//     password: DATABASE_PASSWORD

// });
const pool = new Pool({
    connectionString: DATABASE_URL

})
export const db = drizzle(pool);

