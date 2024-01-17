"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotVerifiedException = exports.CustomNotFoundException = exports.CustomUnauthorizedException = exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
const response_code_enum_1 = require("../enum/response-code.enum");
class CustomHttpException extends common_1.HttpException {
    constructor(response, status, code) {
        super(response, status);
        this.code = code;
    }
    getCode() {
        return this.code;
    }
}
exports.CustomHttpException = CustomHttpException;
const CustomUnauthorizedException = (message) => new CustomHttpException(message, common_1.HttpStatus.UNAUTHORIZED, response_code_enum_1.EResponseCode.Unauthorized);
exports.CustomUnauthorizedException = CustomUnauthorizedException;
const CustomNotFoundException = (message) => new CustomHttpException(message, common_1.HttpStatus.NOT_FOUND, response_code_enum_1.EResponseCode.NotFound);
exports.CustomNotFoundException = CustomNotFoundException;
const EmailNotVerifiedException = (message) => new CustomHttpException(message, common_1.HttpStatus.UNAUTHORIZED, response_code_enum_1.EResponseCode.EmailNotVerified);
exports.EmailNotVerifiedException = EmailNotVerifiedException;
//# sourceMappingURL=custom-http.exception.js.map