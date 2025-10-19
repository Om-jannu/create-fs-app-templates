import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { ApiResponse } from 'my-app-shared';
import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const user = await this.prisma.user.create({
        data: createUserDto,
      });
      return {
        success: true,
        data: user,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create user',
      };
    }
  }

  async findAll(): Promise<ApiResponse<User[]>> {
    try {
      const users = await this.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch users',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch user',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return {
        success: true,
        data: user,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete user',
      };
    }
  }
}
