import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../service/user.service';
export declare class CustomEmailValidation implements ValidatorConstraintInterface {
    private readonly userSVC;
    constructor(userSVC: UserService);
    validate(value: string): Promise<boolean>;
}
export declare function IsEmailUnique(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
