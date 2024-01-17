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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = __importDefault(require("path"));
const mailer_service_1 = require("../mailer/mailer.service");
let MailService = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async userSignUp(mailData) {
        let emailConfirmTitle = 'Welcome to Akooon';
        let text = `${mailData.data.code} is your verification code to use to register`;
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: emailConfirmTitle,
            text: `${this.configService.get('app.frontendDomain', {
                infer: true,
            })}/confirm-email/${mailData.data.code} ${emailConfirmTitle}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'activation.hbs'),
            context: {
                title: emailConfirmTitle,
                app_name: 'Akooon',
                text,
            },
        });
    }
    async forgotPassword(mailData) {
        let resetPasswordTitle = 'Reset password';
        await this.mailerService.sendMail({
            to: mailData.to,
            subject: resetPasswordTitle,
            text: `${this.configService.get('app.frontendDomain', {
                infer: true,
            })}/password-change/${mailData.data.code} ${resetPasswordTitle}`,
            templatePath: path_1.default.join(this.configService.getOrThrow('app.workingDirectory', {
                infer: true,
            }), 'src', 'mail', 'mail-templates', 'reset-password.hbs'),
            context: {
                title: resetPasswordTitle,
                app_name: 'Akooon',
                name: mailData.data.name,
                code: mailData.data.code,
            },
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map