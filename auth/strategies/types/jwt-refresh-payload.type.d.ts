import { IUserJwtPayload } from './jwt-payload.type';
export type JwtPayloadWithRt = IUserJwtPayload & {
    refreshToken: string;
};
