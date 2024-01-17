import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AllConfigType } from 'src/config/config.type';
import { IUserJwtPayload } from './types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService<AllConfigType>);
    validate(payload: IUserJwtPayload): IUserJwtPayload;
}
export {};
