import { Injectable } from "@nestjs/common";
import { IDatabaseAdapter } from "../interface/database.interface";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { Admin } from "../../admin/entity/admin.entity";
import { Order } from "../../order/entity/order.entity";

@Injectable()
export class MockDatabaseAdapter implements IDatabaseAdapter {

  async findAdminByUsername(username: string): Promise<Admin> {
    throw new Error("Method not implemented.");
  }

  async createAdmin(admin: Admin):Promise<Admin> {
    throw new Error("Method not implemented.");
  }

  async updateAdmin(adminId: string, admin: Admin) {
    throw new Error("Method not implemented.");
  }

  async deleteAdmin(adminId: string) {
    throw new Error("Method not implemented.");
  }

  async findAdmin(pagination: PaginationDto): Promise<PaginationResponseDto<Admin>> {
    throw new Error("Method not implemented.");
  }

  async findAdminById(adminId: string): Promise<Admin> {
    throw new Error("Method not implemented.");
  }

  async findOrder(pagination: PaginationDto): Promise<PaginationResponseDto<Order>> {
    throw new Error("Method not implemented.");
  }

}