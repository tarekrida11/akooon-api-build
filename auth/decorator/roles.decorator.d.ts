import { ERoles } from 'src/modules/users/enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: ERoles[]) => import("@nestjs/common").CustomDecorator<string>;
