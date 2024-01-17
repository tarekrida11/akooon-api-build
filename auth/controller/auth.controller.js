"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const decorator_1 = require("../decorator");
const dto_1 = require("../dto");
const auth_confirm_email_dto_1 = require("../dto/auth-confirm-email.dto");
const auth_forgot_password_dto_1 = require("../dto/auth-forgot-password.dto");
const auth_register_dto_1 = require("../dto/auth-register.dto");
const auth_reset_password_dto_1 = require("../dto/auth-reset-password.dto");
const guard_1 = require("../guard");
const auth_service_1 = require("../service/auth.service");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    login(user) {
        return this.service.login(user);
    }
    register(createUserDto) {
        return this.service.register(createUserDto);
    }
    confirmEmail(dto) {
        return this.service.confirmEmail(dto);
    }
    activateEmail(dto) {
        return this.service.activateEmail(dto);
    }
    forgotPassword(forgotPasswordDto) {
        return this.service.forgotPassword(forgotPasswordDto);
    }
    resetPassword(dto) {
        return this.service.resetPassword(dto);
    }
    me(user) {
        return this.service.me(user);
    }
    refresh(userId, refreshToken) {
        return this.service.refreshToken(userId, refreshToken);
    }
    logout(id) {
        return this.service.logout(id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(guard_1.LocalAuthGuard),
    (0, decorator_1.Public)(),
    (0, common_1.Post)('email/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.Post)('email/register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_dto_1.AuthRegisterDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "register", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.Post)('email/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_confirm_email_dto_1.AuthConfirmEmailDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.Post)('email/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ActivateEmailDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "activateEmail", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.Post)('forgot/password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_dto_1.AuthForgotPasswordDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.Post)('reset/password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_password_dto_1.AuthResetPasswordDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "me", null);
__decorate([
    (0, decorator_1.Public)(),
    (0, common_1.UseGuards)(guard_1.RtGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.GetCurrentUserId)()),
    __param(1, (0, decorator_1.GetCurrentUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map