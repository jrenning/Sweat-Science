import type { Config } from "drizzle-kit";
import "dotenv/config"


export default {
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        //@ts-ignore
        connectionString: process.env.DATABASE_URL_BACKUP
    }
    
} satisfies Config