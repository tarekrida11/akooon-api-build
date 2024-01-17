"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const guard_1 = require("./auth/guard");
const app_config_1 = __importDefault(require("./config/app.config"));
const auth_config_1 = __importDefault(require("./config/auth.config"));
const database_config_1 = __importDefault(require("./config/database.config"));
const mail_config_1 = __importDefault(require("./config/mail.config"));
const mail_module_1 = require("./mail/mail.module");
const is_email_unique_decorator_1 = require("./modules/users/decorator/is-email-unique.decorator");
const user_module_1 = require("./modules/users/user.module");
const mongoose_config_service_1 = require("./mongoose-config.service");
const app_secret_module_1 = require("./modules/apps-secret/app-secret.module");
const util_module_1 = require("./utils/util.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [auth_config_1.default, app_config_1.default, database_config_1.default, mail_config_1.default],
                envFilePath: ['.env'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.MongooseConfigService,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            mailer_1.MailerModule,
            app_secret_module_1.AppSecretModule,
            util_module_1.UtilModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.AtGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guard_1.RolesGuard,
            },
            is_email_unique_decorator_1.CustomEmailValidation,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map