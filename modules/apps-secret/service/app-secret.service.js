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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSecretService = void 0;
const common_1 = require("@nestjs/common");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const mongoose_1 = require("@nestjs/mongoose");
const crypto_1 = __importDefault(require("crypto"));
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const create_app_secret_dto_1 = require("../dto/create-app-secret.dto");
const app_secret_schema_1 = require("../schema/app-secret.schema");
let AppSecretService = class AppSecretService {
    constructor(model) {
        this.model = model;
    }
    create(dto) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.findOne(dto.app)), (0, rxjs_1.switchMap)((appSecret) => appSecret
            ? (0, rxjs_1.throwError)(() => new common_1.NotAcceptableException('this app already exist'))
            : (0, rxjs_1.of)(appSecret)), (0, rxjs_1.switchMap)(() => (0, rxjs_1.of)(this.generateSecret())), (0, rxjs_1.switchMap)((secret) => (0, rxjs_1.of)(new create_app_secret_dto_1.NewAppSecret(dto.app, secret))), (0, rxjs_1.switchMap)((appSecret) => this.model.create(appSecret)), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to create app secret'));
        }));
    }
    findOne(app) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.model.findOne({ app })), (0, rxjs_1.catchError)(() => (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to find app secret'))));
    }
    findById(id) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.model.findById(id)), (0, rxjs_1.catchError)(() => (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to find app secret'))));
    }
    delete({ app }) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.model.deleteOne({ app })), (0, rxjs_1.map)(() => { }), (0, rxjs_1.catchError)((e) => {
            console.log(e);
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to delete app secret'));
        }));
    }
    deleteById(id) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.model.findByIdAndDelete(id)), (0, rxjs_1.map)(() => { }), (0, rxjs_1.catchError)((e) => {
            console.log(e);
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to delete app secret'));
        }));
    }
    generateSecret() {
        return crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
    }
};
exports.AppSecretService = AppSecretService;
exports.AppSecretService = AppSecretService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(app_secret_schema_1.AppSecret.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppSecretService);
//# sourceMappingURL=app-secret.service.js.map