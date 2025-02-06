import { Role } from "./role.enum";

export class JwtPayload {
  username: string;
  admin_id: string;
  roles: Role[];
}
