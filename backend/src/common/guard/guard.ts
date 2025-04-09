import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector : Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);
        const ctx=(context.switchToHttp());
        const request=ctx.getRequest();
        if( !roles.includes("admin")) {
            return true
        }
        if(request.body.role?.includes("admin")){
            return true
        }

        return false

    }
}