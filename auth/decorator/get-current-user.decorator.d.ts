import { IUserJwtPayload } from '../strategies/types';
export declare const GetCurrentUser: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof IUserJwtPayload | "refreshToken")[]) => ParameterDecorator;
