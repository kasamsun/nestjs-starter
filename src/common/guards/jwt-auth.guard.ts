import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../auth/entity/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  
  handleRequest(err, user, info: Error, context: ExecutionContext) {
    if (user) {
      // JWT is valid, check roles
      const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
        context.getHandler(),
        context.getClass(),
      ]);
      if (requireRoles) {
        if (!requireRoles.some((role) => user.roles.includes(role))) {
          throw new ForbiddenException();
        }
      }
      return user;
    }
    throw new UnauthorizedException();
  }
}
