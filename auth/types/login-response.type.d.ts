import { User } from 'src/modules/users/schema/user.schema';
export type LoginResponseType = Readonly<{
    token: string;
    refreshToken: string;
    tokenExpires: number;
    user: User;
}>;
