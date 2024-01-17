import { IUser, IUserName, OTP } from '../interface';
export declare class UserNameDto {
    firstName: string;
    middleName: string;
    lastName: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    name: IUserName;
}
export declare class NewUser implements IUser {
    name?: IUserName;
    email?: string;
    password?: string;
    otp?: OTP;
    constructor(user: CreateUserDto, hashedPassword: string, otp: OTP);
}
