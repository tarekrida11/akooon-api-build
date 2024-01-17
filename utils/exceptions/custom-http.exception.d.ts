import { HttpException, HttpStatus } from '@nestjs/common';
import { EResponseCode } from '../enum/response-code.enum';
export declare class CustomHttpException extends HttpException {
    private code;
    constructor(response: string | Record<string, any>, status: HttpStatus, code: EResponseCode);
    getCode(): EResponseCode;
}
export declare const CustomUnauthorizedException: (message: string) => CustomHttpException;
export declare const CustomNotFoundException: (message: string) => CustomHttpException;
export declare const EmailNotVerifiedException: (message: string) => CustomHttpException;
