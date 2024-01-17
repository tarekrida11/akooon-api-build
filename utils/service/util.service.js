"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const rxjs_1 = require("rxjs");
let UtilService = class UtilService {
    hash(value) {
        return (0, rxjs_1.of)(value).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.defer)(() => bcrypt.hash(value, 10))));
    }
    compareHash(value, hash) {
        return (0, rxjs_1.of)(value).pipe((0, rxjs_1.switchMap)(() => (0, rxjs_1.defer)(() => bcrypt.compare(value, hash))));
    }
    generateOTP() {
        return (0, rxjs_1.of)(true).pipe((0, rxjs_1.mergeMap)(() => (0, rxjs_1.forkJoin)([
            (0, rxjs_1.of)(new Date(Date.now() + 3 * 60 * 1000).getTime()),
            (0, rxjs_1.of)(otp_generator_1.default.generate(4, {
                lowerCaseAlphabets: false,
                specialChars: false,
                upperCaseAlphabets: false,
            })),
        ])), (0, rxjs_1.map)(([timestamp, code]) => ({ timestamp, code })), (0, rxjs_1.catchError)(() => {
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException('failed to generate new otp'));
        }));
    }
    validateOTP(otp, code) {
        console.log('otp', otp, 'code', code);
        return (otp && otp.code === code && Date.now() - otp.timestamp < 0);
    }
};
exports.UtilService = UtilService;
exports.UtilService = UtilService = __decorate([
    (0, common_1.Injectable)()
], UtilService);
//# sourceMappingURL=util.service.js.map