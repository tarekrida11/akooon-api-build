import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const AtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AtGuard extends AtGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | import("rxjs").Observable<boolean> | Promise<boolean>;
}
export {};
