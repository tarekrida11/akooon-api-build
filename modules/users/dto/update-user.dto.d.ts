import { ERoles, EUserStatus } from '../enum';
import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: ERoles;
    status?: EUserStatus;
    rtHash?: string;
}
export {};
