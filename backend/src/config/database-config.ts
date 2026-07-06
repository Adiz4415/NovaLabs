import { registerAs } from '@nestjs/config';

/**
 * Database configuration factory for NestJS ConfigModule.
 * Reads PostgreSQL connection settings from environment variables.
 * Access via ConfigService.get('database').
 *
 * Required env vars: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
 * Optional: DB_TYPE (defaults to 'postgres'), DB_SYNCHRONIZE (set 'true' only in development)
 */
export default registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || '',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
}));
