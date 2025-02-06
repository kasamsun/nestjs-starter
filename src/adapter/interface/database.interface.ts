import { Admin } from "../../admin/entity/admin.entity";
import { Order } from "../../order/entity/order.entity";
import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { UpdateAdminDto } from "../../admin/dto/update-admin.dto";

export abstract class IDatabaseAdapter {
  
  abstract findAdminByUsername(username: string):Promise<Admin>;
  
  abstract createAdmin(admin: Admin):Promise<Admin>;
  
  abstract updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): void;
  
  abstract deleteAdmin(adminId: string): void;
  
  abstract findAdmin(pagination: PaginationDto):Promise<PaginationResponseDto<Admin>>;
  
  abstract findAdminById(adminId: string):Promise<Admin>;
  
  abstract findOrder(pagination: PaginationDto):Promise<PaginationResponseDto<Order>>;
 
}
