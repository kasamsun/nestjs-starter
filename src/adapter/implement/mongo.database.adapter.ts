import { IDatabaseAdapter } from "../interface/database.interface";
import { Injectable } from "@nestjs/common";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import dayjs from 'dayjs';
import { PaginationResponseDto } from "../../common/dto/pagination-response.dto";
import { Admin, AdminDocument } from "../schema/mongo.admin.schema";
import { Order, OrderDocument } from "../schema/mongo.order.schema";


@Injectable()
export class MongoDatabaseAdapter implements IDatabaseAdapter {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  private getPagination = (query: PaginationDto) => {
    const take = query.size ? +query.size : 10;
    const skip = query.page ? (query.page-1) * take : 0; 
    const sort = {};
    if (query.sort_by) {
      sort[query.sort_by] = (query.direction>0)?1:-1;
    }
    let find = {};
    // console.log(query.search)
    if (query.search) {
      const searchItems = query.search.split('|')
      for (const searchItem of searchItems) {
        const items = searchItem.split(',')
        if (items.length==3) {
          if (items[1] && items[2]=='equals') {
            find[items[0]] = items[1]
          } else if (items[1] && items[2]=='contains') {
            find[items[0]] = new RegExp(items[1], 'i')
          } else if (items[1] && items[2]=='dateIs') {
            const start = dayjs(items[1]).startOf('day');
            const end = dayjs(items[1]).endOf('day');
            find[items[0]] = {
              $gte: start.toDate(),
              $lte: end.toDate(),
            }
          } else {
            find[items[0]] = items[1]
          }
        }
      }
    }
    // console.log(find)
    return { take, skip, sort, find };
  };

  private paginationResponse = (items: any[], total: number, query: PaginationDto) => {
    const current_page = query.page ? + query.page : 1;
    const total_page = Math.ceil(total / query.size);
    return { total_row: total, items, total_page, current_page };
  };

  async findAdminByUsername(username: string):Promise<Admin> {
    return await this.adminModel.findOne({
      username: username
    });
  }

  async createAdmin(admin: Admin):Promise<Admin> {
    return await this.adminModel.create(admin);
  }

  async updateAdmin(adminId: string, admin: Admin) {
    await this.adminModel.findOneAndUpdate({
      _id: adminId
    }, admin);
  }

  async deleteAdmin(adminId: string) {
    return await this.adminModel.deleteOne({
      _id: adminId
    });
  }
  
  async findAdmin(pagination: PaginationDto):Promise<PaginationResponseDto<Admin>> {
    const { take, skip, sort, find } = this.getPagination(pagination);
    const items = await this.adminModel.find(find).sort(sort).limit(take).skip(skip);
    const total = await this.adminModel.find(find).countDocuments();

    return this.paginationResponse(items, total, pagination);
  }
  
  async findAdminById(adminId: string):Promise<Admin> {
    return await this.adminModel.findById({
      _id: adminId
    });
  }

  async findOrder(pagination: PaginationDto): Promise<PaginationResponseDto<Order>> {
    const { take, skip, sort, find } = this.getPagination(pagination);
    const items = await this.orderModel.find(find).sort(sort).limit(take).skip(skip);
    const total = await this.orderModel.find(find).countDocuments();

    return this.paginationResponse(items, total, pagination);
  }
  
}
