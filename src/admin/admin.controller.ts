import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from 'src/auth/entity/role.enum';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get admin list', description: 'Get admin list' })
  @ApiResponse({ status: 200, type: [PaginationResponseDto<AdminResponseDto>] })
  getAdminList(@Query() pagination: PaginationDto) {
    return this.adminService.getAdminList(pagination);
  }

  @Get(':admin_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get admin', description: 'Get admin' })
  @ApiResponse({ status: 200, type: [PaginationResponseDto<AdminResponseDto>] })
  getAdmin(@Param('admin_id') adminId: string) {
    return this.adminService.getAdmin(adminId);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create admin', description: 'Create admin' })
  @ApiResponse({ status: 201, type: AdminResponseDto })
  createAdmin(@Body() adminDto: CreateAdminDto) {
    return this.adminService.createAdmin(adminDto);
  }

  @Patch(':admin_id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update admin', description: 'Update admin' })
  @ApiResponse({ status: 200 })
  updateAdmin(@Param('admin_id') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(adminId, updateAdminDto);
  }

  @Delete(':admin_id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete admin', description: 'Delete admin' })
  @ApiResponse({ status: 200 })
  deleteAdmin(@Req() req: any, @Param('admin_id') adminId: string) {
    return this.adminService.deleteAdmin(req.user, adminId);
  }

}
