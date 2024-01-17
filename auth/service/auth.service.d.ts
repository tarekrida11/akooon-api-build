/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AllConfigType } from 'src/config/config.type';
import { MailService } from 'src/mail/mail.service';
import { IUser, OTP } from 'src/modules/users/interface';
import { UserService } from 'src/modules/users/service/user.service';
import { Tokens } from '../interface';
import { IUserJwtPayload } from '../strategies/types';
import { Types } from 'mongoose';
import { UtilService } from 'src/utils/service/util.service';
import { ActivateEmailDto, AuthConfirmEmailDto, AuthForgotPasswordDto, AuthRegisterDto, AuthResetPasswordDto } from '../dto';
export declare class AuthService {
    private jwtService;
    private userService;
    private configService;
    private mailService;
    private utilService;
    constructor(jwtService: JwtService, userService: UserService, configService: ConfigService<AllConfigType>, mailService: MailService, utilService: UtilService);
    validateUser(email: string, password: string): Promise<IUser>;
    login(user: IUser): Observable<Tokens>;
    register(dto: AuthRegisterDto): Observable<void>;
    createUser(user: AuthRegisterDto, otp: OTP): Observable<IUser>;
    confirmEmail(dto: AuthConfirmEmailDto): Observable<Tokens>;
    activateEmail(dto: ActivateEmailDto): Observable<void>;
    private sendOTP;
    forgotPassword(dto: AuthForgotPasswordDto): Observable<void>;
    resetPassword(dto: AuthResetPasswordDto): Observable<Tokens>;
    me(payload: IUserJwtPayload): Observable<IUser>;
    refreshToken(userId: Types.ObjectId, rt: string): Observable<Tokens>;
    logout(userId: Types.ObjectId): Observable<void>;
    private getTokens;
    private updateRtHash;
}
