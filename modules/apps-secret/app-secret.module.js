"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSecretModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_secret_controller_1 = require("./controller/app-secret.controller");
const app_secret_schema_1 = require("./schema/app-secret.schema");
const app_secret_service_1 = require("./service/app-secret.service");
let AppSecretModule = class AppSecretModule {
};
exports.AppSecretModule = AppSecretModule;
exports.AppSecretModule = AppSecretModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: app_secret_schema_1.AppSecret.name, schema: app_secret_schema_1.AppSecretSchema },
            ]),
        ],
        controllers: [app_secret_controller_1.AppSecretController],
        providers: [app_secret_service_1.AppSecretService],
    })
], AppSecretModule);
//# sourceMappingURL=app-secret.module.js.map