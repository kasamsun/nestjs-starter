import { Injectable } from '@nestjs/common';
import { IDatabaseAdapter } from '../adapter/interface/database.interface';
import { I18nService } from 'nestjs-i18n';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { DeleteDataAuthorizeException, DuplicateUsernameException } from '../common/exceptions/business.exception';
import { JwtPayload } from '../auth/entity/jwt-payload';

@Injectable()
export class AdminService {
  constructor(
    private readonly i18n: I18nService,
    private readonly databaseAdapter: IDatabaseAdapter,
  ) {}

  async getAdminList(pagination: PaginationDto):Promise<PaginationResponseDto<AdminResponseDto>> {
    const result = await this.databaseAdapter.findAdmin(pagination);

    return {
      total_page: result.total_page,
      total_row: result.total_row,
      current_page: result.current_page,
      items: result.items.map(item=>({
        id: item.id,
        username: item.username,
        full_name: item.full_name,
        role: item.role,
        status: item.status,
        last_login_date: item.last_login_date,
      }))
    };
  }

  async getAdmin(adminId: string):Promise<AdminResponseDto> {
    const admin = await this.databaseAdapter.findAdminById(adminId);
    return {
      id: admin.id,
      username: admin.username,
      full_name: admin.full_name,
      role: admin.role,
      status: admin.status,
      last_login_date: admin.last_login_date
    }
  }

  async createAdmin(adminDto: CreateAdminDto):Promise<AdminResponseDto> {

    const admin = await this.databaseAdapter.findAdminByUsername(adminDto.username);
    if (admin) {
      throw new DuplicateUsernameException(this.i18n, adminDto.username)
    }

    const newAdmin = await this.databaseAdapter.createAdmin({
      username: adminDto.username,
      password: bcrypt.hashSync(adminDto.password, 10),
      full_name: adminDto.full_name,
      role: adminDto.role,
      status: adminDto.status,
    });

    return {
      id: newAdmin.id,
      username: newAdmin.username,
      full_name: newAdmin.full_name,
      role: newAdmin.role,
      status: newAdmin.status,
    }
    
  }

  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      updateAdminDto.password = bcrypt.hashSync(updateAdminDto.password, 10)
    } else {
      delete updateAdminDto.password
    }

    await this.databaseAdapter.updateAdmin(adminId, updateAdminDto);
  }

  async deleteAdmin(currentLogin: JwtPayload, adminId: string) {
    if (currentLogin.admin_id==adminId) {
      // can not delete yourself
      throw new DeleteDataAuthorizeException(this.i18n);
    }

    await this.databaseAdapter.deleteAdmin(adminId);
  }



}
