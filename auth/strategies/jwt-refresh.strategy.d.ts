import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AllConfigType } from 'src/config/config.type';
import { IUserJwtPayload, JwtPayloadWithRt } from './types';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor(configService: ConfigService<AllConfigType>);
    validate(req: Request, payload: IUserJwtPayload): JwtPayloadWithRt;
}
export {};
