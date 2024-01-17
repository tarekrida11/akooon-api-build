import { Observable } from 'rxjs';
import { OTP } from 'src/modules/users/interface';
export declare class UtilService {
    hash(value: string): Observable<string>;
    compareHash(value: string, hash: string): Observable<boolean>;
    generateOTP(): Observable<OTP>;
    validateOTP(otp: OTP, code: string): boolean;
}
