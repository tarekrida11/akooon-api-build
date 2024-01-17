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
import { Model, Types } from 'mongoose';
import { Observable } from 'rxjs';
import { UtilService } from 'src/utils/service/util.service';
import { IUser, OTP } from '../interface';
import { User } from '../schema/user.schema';
export declare class UserService {
    private userModel;
    private utilService;
    constructor(userModel: Model<User>, utilService: UtilService);
    create(user: IUser): Observable<IUser>;
    findAll(): Observable<IUser[]>;
    findByEmail(email: string): Observable<IUser>;
    findById(id: Types.ObjectId): Observable<IUser>;
    updateRtHash(id: Types.ObjectId, rtHash: string): Observable<void>;
    updateUserOTP(id: Types.ObjectId, otp: OTP): Observable<void>;
    updateUserPassword(email: string, newPass: string): Observable<IUser>;
    checkOTP(email: string, code: string): Observable<IUser>;
}
