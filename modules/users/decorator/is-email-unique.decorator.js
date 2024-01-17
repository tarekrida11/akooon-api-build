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
exports.IsEmailUnique = exports.CustomEmailValidation = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../service/user.service");
let CustomEmailValidation = class CustomEmailValidation {
    constructor(userSVC) {
        this.userSVC = userSVC;
    }
    async validate(value) {
        const user = await (0, rxjs_1.lastValueFrom)(this.userSVC.findByEmail(value));
        if (user)
            throw new common_1.UnprocessableEntityException('Email already exists');
        return true;
    }
};
exports.CustomEmailValidation = CustomEmailValidation;
exports.CustomEmailValidation = CustomEmailValidation = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'email', async: true }),
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CustomEmailValidation);
function IsEmailUnique(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: CustomEmailValidation,
        });
    };
}
exports.IsEmailUnique = IsEmailUnique;
//# sourceMappingURL=is-email-unique.decorator.js.map