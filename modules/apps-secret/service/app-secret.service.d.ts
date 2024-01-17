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
import { CreateAppSecret } from '../dto/create-app-secret.dto';
import { IAppSecret } from '../interface/apps-secret.interface';
import { AppSecret } from '../schema/app-secret.schema';
import { DeleteAppSecret } from '../dto';
export declare class AppSecretService {
    private model;
    constructor(model: Model<AppSecret>);
    create(dto: CreateAppSecret): Observable<IAppSecret>;
    findOne(app: string): Observable<IAppSecret>;
    findById(id: Types.ObjectId): Observable<IAppSecret>;
    delete({ app }: Pick<DeleteAppSecret, 'app'>): Observable<void>;
    deleteById(id: Types.ObjectId): Observable<void>;
    generateSecret(): string;
}
