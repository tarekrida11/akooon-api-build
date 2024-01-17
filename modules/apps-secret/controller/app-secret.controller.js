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
exports.AppSecretController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const create_app_secret_dto_1 = require("../dto/create-app-secret.dto");
const app_secret_service_1 = require("../service/app-secret.service");
const enum_1 = require("../../users/enum");
const decorator_1 = require("../../../auth/decorator");
const mongoose_1 = require("mongoose");
const dto_1 = require("../dto");
let AppSecretController = class AppSecretController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    find(app) {
        return this.service.findOne(app);
    }
    findById(id) {
        return this.service.findById(id);
    }
    deleteById(id) {
        return this.service.deleteById(id);
    }
    delete(dto) {
        return this.service.delete(dto);
    }
};
exports.AppSecretController = AppSecretController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_app_secret_dto_1.CreateAppSecret]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppSecretController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)('app')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppSecretController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppSecretController.prototype, "findById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppSecretController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteAppSecret]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppSecretController.prototype, "delete", null);
exports.AppSecretController = AppSecretController = __decorate([
    (0, swagger_1.ApiTags)('App-Secret'),
    (0, decorator_1.Roles)(enum_1.ERoles.ADMIN),
    (0, common_1.Controller)('app-secret'),
    __metadata("design:paramtypes", [app_secret_service_1.AppSecretService])
], AppSecretController);
//# sourceMappingURL=app-secret.controller.js.map