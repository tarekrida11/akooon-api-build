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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const mail_service_1 = require("../../mail/mail.service");
const dto_1 = require("../../modules/users/dto");
const user_service_1 = require("../../modules/users/service/user.service");
const custom_http_exception_1 = require("../../utils/exceptions/custom-http.exception");
const util_service_1 = require("../../utils/service/util.service");
const dto_2 = require("../dto");
let AuthService = class AuthService {
    constructor(jwtService, userService, configService, mailService, utilService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
        this.mailService = mailService;
        this.utilService = utilService;
    }
    async validateUser(email, password) {
        const user = await (0, rxjs_1.lastValueFrom)(this.userService.findByEmail(email));
        if (!user)
            throw (0, custom_http_exception_1.CustomUnauthorizedException)('email not registered');
        const valid = await (0, rxjs_1.lastValueFrom)(this.utilService.compareHash(password, user.password));
        if (!valid)
            throw (0, custom_http_exception_1.CustomUnauthorizedException)('wrong password');
        if (!user.emailVerified)
            throw (0, custom_http_exception_1.EmailNotVerifiedException)('Email not verified');
        return new dto_2.LoggedUser(user);
    }
    login(user) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.getTokens(user)));
    }
    register(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.generateOTP()), (0, rxjs_1.mergeMap)((otp) => (0, rxjs_1.forkJoin)([(0, rxjs_1.of)(otp), (0, rxjs_1.from)(this.createUser(dto, otp))])), (0, rxjs_1.mergeMap)(([otp, user]) => (0, rxjs_1.forkJoin)([
            (0, rxjs_1.of)(user),
            (0, rxjs_1.from)(this.mailService.userSignUp({
                to: user.email,
                data: { code: otp.code },
            })),
        ])), (0, rxjs_1.map)(() => { }), (0, rxjs_1.catchError)((e) => {
            console.log(e);
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to register new user');
        }));
    }
    createUser(user, otp) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.hash(user.password)), (0, rxjs_1.map)((hashedPassword) => new dto_1.NewUser(user, hashedPassword, otp)), (0, rxjs_1.switchMap)((newUser) => this.userService.create(newUser)), (0, rxjs_1.catchError)((e) => {
            console.log(e);
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to create new user');
        }));
    }
    confirmEmail(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.checkOTP(dto.email, dto.code)), (0, rxjs_1.switchMap)((user) => this.getTokens(user)), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException(' failed to confirm email');
        }));
    }
    activateEmail(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.generateOTP()), (0, rxjs_1.switchMap)((otp) => this.sendOTP(dto.email, otp, () => (0, rxjs_1.from)(this.mailService.userSignUp({
            to: dto.email,
            data: { code: otp.code },
        })))), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to send email activation code');
        }));
    }
    sendOTP(email, otp, mailObservable) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.findByEmail(email)), (0, rxjs_1.mergeMap)((user) => (0, rxjs_1.forkJoin)([
            (0, rxjs_1.from)(this.userService.updateUserOTP(user._id, otp)),
            (0, rxjs_1.from)(mailObservable(user.name.firstName)),
        ])), (0, rxjs_1.map)(() => { }), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to send OTP');
        }));
    }
    forgotPassword(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.generateOTP()), (0, rxjs_1.switchMap)((otp) => this.sendOTP(dto.email, otp, (name) => (0, rxjs_1.from)(this.mailService.forgotPassword({
            to: dto.email,
            data: { code: otp.code, name },
        })))), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to send email activation code');
        }));
    }
    resetPassword(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.checkOTP(dto.email, dto.code)), (0, rxjs_1.switchMap)(() => this.userService.updateUserPassword(dto.email, dto.password)), (0, rxjs_1.switchMap)((user) => this.getTokens(user)), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to reset password'));
        }));
    }
    me(payload) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.findById(payload.sub)));
    }
    refreshToken(userId, rt) {
        let currentUser;
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.findById(userId)), (0, rxjs_1.switchMap)((user) => !user
            ? (0, rxjs_1.throwError)(() => (0, custom_http_exception_1.CustomUnauthorizedException)('Access Denied'))
            : (0, rxjs_1.of)((currentUser = user))), (0, rxjs_1.switchMap)(() => !currentUser.rtHash
            ? (0, rxjs_1.throwError)(() => (0, custom_http_exception_1.CustomUnauthorizedException)('Access Denied'))
            : this.utilService.compareHash(rt, currentUser.rtHash)), (0, rxjs_1.switchMap)((valid) => !valid
            ? (0, rxjs_1.throwError)(() => (0, custom_http_exception_1.CustomUnauthorizedException)('Access Denied'))
            : this.getTokens(currentUser)), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to refresh');
        }));
    }
    logout(userId) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userService.updateRtHash(userId, null)));
    }
    getTokens(user) {
        const jwtPayload = {
            sub: user._id,
            email: user.email,
            role: user.role,
        };
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.mergeMap)(() => (0, rxjs_1.forkJoin)([
            (0, rxjs_1.from)(this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.getOrThrow('auth.secret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.expires', {
                    infer: true,
                }),
            })),
            (0, rxjs_1.from)(this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            })),
        ])), (0, rxjs_1.mergeMap)(([access_token, refresh_token]) => (0, rxjs_1.forkJoin)([
            (0, rxjs_1.of)({ access_token, refresh_token }),
            (0, rxjs_1.from)(this.updateRtHash(user._id, refresh_token)),
        ])), (0, rxjs_1.map)(([tokens]) => tokens));
    }
    updateRtHash(id, rt) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.hash(rt)), (0, rxjs_1.switchMap)((rtHash) => this.userService.updateRtHash(id, rtHash)));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService,
        mail_service_1.MailService,
        util_service_1.UtilService])
], AuthService);
//# sourceMappingURL=auth.service.js.map