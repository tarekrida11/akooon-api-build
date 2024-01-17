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
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { IUser } from 'src/modules/users/interface';
import { ActivateEmailDto } from '../dto';
import { AuthConfirmEmailDto } from '../dto/auth-confirm-email.dto';
import { AuthForgotPasswordDto } from '../dto/auth-forgot-password.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { AuthResetPasswordDto } from '../dto/auth-reset-password.dto';
import { Tokens } from '../interface';
import { AuthService } from '../service/auth.service';
import { IUserJwtPayload } from '../strategies/types';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(user: IUser): Observable<Tokens>;
    register(createUserDto: AuthRegisterDto): Observable<void>;
    confirmEmail(dto: AuthConfirmEmailDto): Observable<Tokens>;
    activateEmail(dto: ActivateEmailDto): Observable<void>;
    forgotPassword(forgotPasswordDto: AuthForgotPasswordDto): Observable<void>;
    resetPassword(dto: AuthResetPasswordDto): Observable<Tokens>;
    me(user: IUserJwtPayload): Observable<IUser>;
    refresh(userId: Types.ObjectId, refreshToken: string): Observable<Tokens>;
    logout(id: Types.ObjectId): Observable<void>;
}
