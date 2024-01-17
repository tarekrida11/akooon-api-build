export type AppConfig = {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    port: number;
    apiPrefix: string;
    frontendDomain: string;
    backendDomain: string;
};
export type AuthConfig = {
    secret: string;
    expires: string;
    refreshSecret: string;
    refreshExpires: string;
};
export type AllConfigType = {
    app: AppConfig;
    auth: AuthConfig;
    database: DatabaseConfig;
    mail: MailConfig;
};
export type DatabaseConfig = {
    uri: string;
};
export type MailConfig = {
    user: string;
    password: string;
    defaultEmail: string;
    defaultName: string;
};
