/**
 * Application-level configuration factory for NestJS ConfigModule.
 * Exposes the APP_NAME environment variable under the 'app' namespace.
 * Access via ConfigService.get<string>('app.appName').
 */
export default () => ({
  appName: process.env.APP_NAME,
});
