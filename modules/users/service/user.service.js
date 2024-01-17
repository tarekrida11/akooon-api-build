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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const response_code_enum_1 = require("../../../utils/enum/response-code.enum");
const custom_http_exception_1 = require("../../../utils/exceptions/custom-http.exception");
const util_service_1 = require("../../../utils/service/util.service");
const user_schema_1 = require("../schema/user.schema");
let UserService = class UserService {
    constructor(userModel, utilService) {
        this.userModel = userModel;
        this.utilService = utilService;
    }
    create(user) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userModel.create(user)));
    }
    findAll() {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userModel.find({}).exec()));
    }
    findByEmail(email) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.userModel.findOne({ email })));
    }
    findById(id) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.defer)(() => this.userModel.findById(id).select('-password'))));
    }
    updateRtHash(id, rtHash) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.defer)(() => this.userModel.updateOne({ _id: id }, { $set: { rtHash } }))), (0, rxjs_1.map)(() => {
            return;
        }));
    }
    updateUserOTP(id, otp) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.defer)(() => this.userModel.updateOne({ _id: id }, { $set: { otp } }))), (0, rxjs_1.map)(() => {
            return;
        }), (0, rxjs_1.catchError)(() => (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to update user OTP'))));
    }
    updateUserPassword(email, newPass) {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.utilService.hash(newPass)), (0, rxjs_1.switchMap)((hashedPass) => this.userModel.findOneAndUpdate({ email }, { $set: { password: hashedPass, otp: null } })), (0, rxjs_1.map)((user) => user), (0, rxjs_1.catchError)(() => (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to update user password'))));
    }
    checkOTP(email, code) {
        let currentUser;
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.switchMap)(() => this.findByEmail(email)), (0, rxjs_1.switchMap)((user) => !user
            ? (0, rxjs_1.throwError)(() => (0, custom_http_exception_1.CustomNotFoundException)('user not found'))
            : (0, rxjs_1.of)(currentUser = user)), (0, rxjs_1.switchMap)((user) => !this.utilService.validateOTP(user.otp, code)
            ? (0, rxjs_1.throwError)(() => new custom_http_exception_1.CustomHttpException('invalid otp', common_1.HttpStatus.NOT_ACCEPTABLE, response_code_enum_1.EResponseCode.InvalidOTP))
            : this.userModel.updateOne({ email }, { $set: { emailVerified: true, otp: null } })), (0, rxjs_1.map)(() => currentUser), (0, rxjs_1.catchError)((e) => {
            if (e instanceof common_1.HttpException)
                throw e;
            throw new common_1.InternalServerErrorException('failed to validated OTP');
        }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        util_service_1.UtilService])
], UserService);
//# sourceMappingURL=user.service.js.map